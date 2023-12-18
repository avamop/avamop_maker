import { MakerSearchIgnoreTrigger } from "./MakerSearchIgnoreTrigger";

// パーツ一覧からアバターのステータス、もとい組み合わせオブジェクトを生成する
export const MakerSelectedPartsGen = (
  partsObject: PartsObjectSplit,
  defaultColors: DefaultColors
): SelectedParts => {
  const selectedParts: SelectedParts = {
    bodyType: null,
    face: "clear",
    category: {},
    selectedColor: {},
    selectedFace: {},
  };
  const bodyTypeValue =
    partsObject["body"].partList["body"].items[
      Object.keys(partsObject["body"].partList["body"].items)[0]
    ].bodyType;
  try {
    if (!bodyTypeValue) {
      throw new Error(`エラー:bodyのbodyTypeプロパティに値がありません`);
    } else if (bodyTypeValue.length > 1) {
      throw new Error(`エラー:bodyのbodyTypeプロパティの値が複数あります`);
    } else {
      selectedParts.bodyType = Object.keys(
        partsObject["body"].partList["body"].items
      )[0];
    }
  } catch (error) {
    console.error(error.message);
  }
  for (const category in partsObject) {
    const { partList, partCount } = partsObject[category];
    const partSplits: string[] = Object.keys(partList);

    for (let i = 0; i < partCount; i++) {
      const partSplit: string = partSplits[0];
      let defaultItemCnt: number = 0;
      partsObject[category].partList[partSplit].items;
      for (let item in partsObject[category].partList[partSplit].items) {
        let bodyType =
          partsObject[category].partList[partSplit].items[item].bodyType;
        if (
          bodyType === null ||
          (Array.isArray(bodyType) && bodyType.includes(selectedParts.bodyType))
        ) {
          break;
        }
        defaultItemCnt++;
      }
      // console.log(defaultItem);
      let partName: string;
      const ignoreTriggerList: string[] = MakerSearchIgnoreTrigger(
        partsObject,
        category
      );
      if (
        ignoreTriggerList &&
        ignoreTriggerList.some((ignoreTrigger) =>
          selectedParts.category.hasOwnProperty(ignoreTrigger)
        )
      ) {
        partName = "";
      } else {
        partName = Object.keys(partsObject[category].partList[partSplit].items)[
          defaultItemCnt
        ];
      }

      // console.log(Object.keys(partsObject[category].partList[partSplit].items));
      {
        const selectedPartsCategory: SelectedPartsCategory = {
          partName,
          partFlip: false,
        };
        selectedParts.category[
          partCount === 1 ? category : `${category}_${i + 1}`
        ] = selectedPartsCategory;
      }
    }
  }
  for (const colorGroup in defaultColors) {
    selectedParts.selectedColor[colorGroup] = defaultColors[colorGroup];
  }
  for (const category in partsObject) {
    selectedParts.selectedFace[category] = "clear";
  }
  return selectedParts;
};
