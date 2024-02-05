import "jimp/browser/lib/jimp";
import { JimpObject, JimpType } from "../../../types/jimp";
import { MakerPartsColoring } from "./MakerPartsColoring";

declare const Jimp: JimpObject;

const MAX_PROMISE = 20;

// パスの入ったpartsObjectをJimpデータの入ったものに変換する
export const MakerConvertPartsJimp = async (
  partsObject: PartsObjectSplit,
  partsPath: string,
  nullImage: JimpType,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject
): Promise<PartsObjectJimp> => {
  const partsObjectJimp: PartsObjectJimp = {};
  for (const category in selectedParts.category) {
    partsObjectJimp[category] = {
      partCount: partsObject[category].partCount,
      partChain: partsObject[category].partChain,
      ignoreTrigger: partsObject[category].ignoreTrigger,
      partList: {},
    };
    for (const partSplit in partsObject[category.replace(/_\d+$/, "")]
      .partList) {
      partsObjectJimp[category].partList[partSplit] = {
        colorGroup:
          partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
            .colorGroup,
        partOrder:
          partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
            .partOrder,
        items: {},
      };
      for (const item in partsObject[category.replace(/_\d+$/, "")].partList[
        partSplit
      ].items) {
        partsObjectJimp[category].partList[partSplit].items[item] = {
          bodyType:
            partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[item].bodyType,
          enableColor:
            partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[item].enableColor,
          faces: {},
        };

        await asyncMap(
          Object.keys(
            partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[item].faces
          ),
          async (face) => {
            let jimpData: JimpType;

            if (
              partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
                .items[item].faces[face].imagePath == ""
            ) {
              jimpData = nullImage;
            } else {
              jimpData = await partRead(
                partsPath +
                  partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
                    .items[item].faces[face].imagePath,
                partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
                  .colorGroup,
                selectedParts,
                colorsObject,
                partSplit
              );
              //パーツのパスからJimpデータを生成する
            }
            partsObjectJimp[category].partList[partSplit].items[item].faces[
              face
            ] = {
              jimpData: jimpData,
            };
          }
        );
      }
    }
  }
  return partsObjectJimp;
};

//パーツ画像を読み込んで返す関数
const partRead = async (
  imagePath: string,
  colorGroup: string,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject,
  partIndividual: string
): Promise<JimpType> => {
  try {
    const image: JimpType = await Jimp.read(imagePath);
    return await MakerPartsColoring(
      image,
      partIndividual,
      colorGroup,
      selectedParts,
      colorsObject
    );
  } catch (error) {
    console.log("パーツ画像が見つかりません:" + error);
    return;
  }
};

const asyncMap = async (
  array,
  mapper,
  concurrency = MAX_PROMISE
): Promise<FacesJimp[] | MenuPartIconsCategoryBase64[]> => {
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
