// パーツ一覧からアバターのステータス、もとい組み合わせオブジェクトを生成する
export const MakerSelectedPartsGen = (
  PartsObject: PartsObjectSplit
): SelectedParts => {
  const SelectedParts: SelectedParts = { bodyType: null, category: {} };
  const bodyTypeValue =
    PartsObject["body"].partList["body"].items[
      Object.keys(PartsObject["body"].partList["body"].items)[0]
    ].bodyType;
  try {
    if (bodyTypeValue) {
      throw new Error(`エラー:bodyのbodyTypeプロパティに値があります`);
    } else {
      SelectedParts.bodyType = Object.keys(
        PartsObject["body"].partList["body"].items
      )[0];
    }
  } catch (error) {
    console.error(error.message);
  }
  for (const category in PartsObject) {
    const { partList, partCount } = PartsObject[category];
    const partSplits = Object.keys(partList);

    for (let i = 0; i < partCount; i++) {
      const partSplit = partSplits[0];
      const partName = Object.keys(
        PartsObject[category].partList[partSplit].items
      )[0];
      {
        const SelectedPartsCategory = {
          partSplit,
          partName,
          partFlip: false,
        };
        SelectedParts.category[
          partCount === 1 ? category : `${category}_${i + 1}`
        ] = SelectedPartsCategory;
      }
    }
  }
  return SelectedParts;
};
