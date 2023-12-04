// パーツ一覧からアバターのステータス、もとい組み合わせオブジェクトを生成する
export const MakerSelectedPartsGen = (
  partsObject: PartsObjectSplit
): SelectedParts => {
  const selectedParts: SelectedParts = { bodyType: null, category: {} };
  const bodyTypeValue =
    partsObject["body"].partList["body"].items[
      Object.keys(partsObject["body"].partList["body"].items)[0]
    ].bodyType;
  try {
    if (bodyTypeValue) {
      throw new Error(`エラー:bodyのbodyTypeプロパティに値があります`);
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
    const partSplits = Object.keys(partList);

    for (let i = 0; i < partCount; i++) {
      const partSplit = partSplits[0];
      const partName = Object.keys(
        partsObject[category].partList[partSplit].items
      )[0];
      {
        const selectedPartsCategory = {
          partSplit,
          partName,
          partFlip: false,
        };
        selectedParts.category[
          partCount === 1 ? category : `${category}_${i + 1}`
        ] = selectedPartsCategory;
      }
    }
  }
  return selectedParts;
};
