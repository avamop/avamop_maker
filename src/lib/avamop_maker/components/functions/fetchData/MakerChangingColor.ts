import SelectedPartsForCanvasContext from "../../../store/SelectedPartsForCanvasContext";
import { MakerCombineMenuPartIcons } from "../imageProcess/MakerCombineMenuPartIcons";
import { MakerConvertCategory } from "../imageProcess/MakerConvertPartsToMenuIcons";
import { MakerPartsColoring } from "../imageProcess/MakerPartsColoring";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

const MAX_PROMISE = 12;

export const MakerChangingColor = async (
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  selectedColorGroup: string,
  selectedPartSplit: string,
  enableChain: boolean,
  color: string,
  selectedCategory: string,
  partName: string,
  partsObject: PartsObjectSplit,
  partsObjectJimp: PartsObjectJimp,
  setPartsObjectJimp: React.Dispatch<React.SetStateAction<PartsObjectJimp>>,
  colorsObject,
  partsPath: string,
  menuPartIcons: CombinePartIconsObjectBase64,
  setMenuPartIcons: React.Dispatch<
    React.SetStateAction<CombinePartIconsObjectBase64>
  >
) => {
  // console.log(selectedColorGroup);
  let newColorGroup = selectedColorGroup;
  if (selectedColorGroup === "none") {
    const partList = partsObject[selectedCategory].partList;
    newColorGroup =
      selectedPartSplit === "default"
        ? selectedColorGroup === selectedCategory
          ? selectedCategory
          : Object.keys(partList).length === 1
          ? partList[Object.keys(partList)[0]].colorGroup
          : "none"
        : partList[selectedPartSplit].colorGroup;
  }
  const selectedGroup = selectedParts.selectedColor[selectedColorGroup];
  const defaultSplit = selectedGroup["default"];
  let updateColor: SelectedParts = {
    bodyType: selectedParts.bodyType,
    face: selectedParts.face,
    category: selectedParts.category,
    selectedColor: {
      ...selectedParts.selectedColor,
      [newColorGroup]: enableChain
        ? {
            default: {
              color: color,
              hueShiftReverse: defaultSplit.hueShiftReverse,
              saturationReverse: defaultSplit.saturationReverse,
              hueGraph: defaultSplit.hueGraph,
              saturationGraph: defaultSplit.saturationGraph,
              valueGraph: defaultSplit.valueGraph,
            },
          }
        : {
            ...selectedGroup,
            [selectedPartSplit]: {
              color: color,
              hueShiftReverse: selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].hueShiftReverse
                : defaultSplit.hueShiftReverse,
              saturationReverse: selectedParts.selectedColor[
                selectedColorGroup
              ][selectedPartSplit]
                ? selectedGroup[selectedPartSplit].saturationReverse
                : defaultSplit.saturationReverse,
              hueGraph: selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].hueGraph
                : defaultSplit.hueGraph,
              saturationGraph: selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].saturationGraph
                : defaultSplit.saturationGraph,
              valueGraph: selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].valueGraph
                : defaultSplit.valueGraph,
            },
          },
    },
    selectedFace: selectedParts.selectedFace,
  };
  setSelectedParts(updateColor);

  let updatePartsObjectJimp = {
    ...partsObjectJimp,
  };
  let updateMenuPartIcon: CombinePartIconsObjectBase64 = {
    ...menuPartIcons,
  };
  if (enableChain) {
    for (const category in partsObjectJimp) {
      const partList = partsObjectJimp[category].partList;
      for (const partSplit in partList) {
        if (partList[partSplit].colorGroup === selectedColorGroup) {
          const items = partList[partSplit].items;
          await asyncMap(Object.keys(items), async (item) => {
            updatePartsObjectJimp[category].partList[partSplit].items[
              item
            ].faces = await faceJimpWrite(
              item,
              partsObject,
              category,
              partSplit,
              selectedColorGroup,
              selectedParts,
              colorsObject,
              partsPath
            );
          });

          const combineItems: ItemIconsForCombine = MakerConvertCategory(
            updatePartsObjectJimp[category].partList
          );
          await asyncMap(Object.keys(combineItems), async (item) => {
            const partList: CombinePartIconsCategoryBase64 = {
              bodyType: combineItems[item].bodyType,
              faces: await MakerCombineMenuPartIcons(combineItems[item].peaces),
            };
            updateMenuPartIcon[category].partList[item] = partList;
          });
        }
      }
    }
  } else {
    const items =
      updatePartsObjectJimp[selectedCategory].partList[selectedPartSplit].items;
    for (const item in items) {
      await asyncMap(Object.keys(items), async (item) => {
        updatePartsObjectJimp[selectedCategory].partList[
          selectedPartSplit
        ].items[item].faces = await faceJimpWrite(
          item,
          partsObject,
          selectedCategory,
          selectedPartSplit,
          selectedColorGroup,
          selectedParts,
          colorsObject,
          partsPath
        );
      });
    }
    const combineItems: ItemIconsForCombine = MakerConvertCategory(
      updatePartsObjectJimp[selectedCategory].partList
    );
    await asyncMap(Object.keys(combineItems), async (item) => {
      const partList: CombinePartIconsCategoryBase64 = {
        bodyType: combineItems[item].bodyType,
        faces: await MakerCombineMenuPartIcons(combineItems[item].peaces),
      };
      updateMenuPartIcon[selectedCategory].partList[item] = partList;
    });
  }
  setPartsObjectJimp(updatePartsObjectJimp);
  console.log(updateMenuPartIcon);
  setMenuPartIcons(updateMenuPartIcon);
};

const faceJimpWrite = async (
  partName: string,
  partsObject: PartsObjectSplit,
  selectedCategory: string,
  selectedPartSplit,
  selectedColorGroup: string,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject,
  partsPath: string
): Promise<FacesJimp> => {
  const coloredImageObject: FacesJimp = {};
  for (const face in partsObject[selectedCategory].partList[selectedPartSplit]
    .items[partName].faces) {
    const image = await Jimp.read(
      partsPath +
        partsObject[selectedCategory].partList[selectedPartSplit].items[
          partName
        ].faces[face].imagePath
    );
    const coloredImage: Jimp = await MakerPartsColoring(
      image,
      selectedPartSplit,
      selectedColorGroup,
      selectedParts,
      colorsObject
    );
    coloredImageObject[face] = {
      jimpData: coloredImage,
    };
    return coloredImageObject;
  }
};

const asyncMap = async (
  array,
  mapper,
  concurrency = MAX_PROMISE
): Promise<FacesJimp[] | CombinePartIconsCategoryBase64[]> => {
  const queue = array.slice();
  const results = new Array(array.length);
  const workers = new Array(concurrency).fill(Promise.resolve());

  const pushTask = (i) => {
    if (queue.length) {
      const item = queue.shift();
      return mapper(item).then((result) => {
        results[i] = result;
        return pushTask(i);
      });
    }
  };

  await Promise.all(workers.map(pushTask));

  return results;
};
