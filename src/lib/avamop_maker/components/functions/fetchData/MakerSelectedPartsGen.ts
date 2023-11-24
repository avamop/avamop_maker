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
    if (bodyTypeValue === null) {
      throw new Error(`エラー:bodyのbodyTypeプロパティに値がありません`);
    } else if (bodyTypeValue.length > 1) {
      throw new Error("エラー:bodyのbodyTypeプロパティが複数あります");
    } else if (bodyTypeValue[0] == 0) {
      throw new Error("エラー:bodyのbodyTypeプロパティが0になっています");
    } else {
      SelectedParts.bodyType = bodyTypeValue[0];
    }
  } catch (error) {
    console.error(error.message);
  }
  for (const category in PartsObject) {
    const { partList, partCount, colorGroup } = PartsObject[category];
    const partSplits = Object.keys(partList);

    for (let i = 0; i < partCount; i++) {
      const partSplit = partSplits[0];
      const partName = Object.keys(
        PartsObject[category].partList[partSplit].items
      )[0];
      if (colorGroup === "eye") {
        const SelectedPartsCategory: SelectedPartsCategory<"eye"> = {
          colorGroup,
          partName,
          partColor: { left: "black", right: "black" },
        };
        SelectedParts.category[
          partCount === 1 ? category : `${category}_${i + 1}`
        ] = SelectedPartsCategory;
      } else {
        const SelectedPartsCategory: SelectedPartsCategory<string> = {
          colorGroup,
          partName,
          partColor:
            colorGroup === ("hair" || "highlight" || "beard")
              ? "suddleBrown"
              : colorGroup === "skin"
              ? "bisque"
              : "gray",
        };
        SelectedParts.category[
          partCount === 1 ? category : `${category}_${i + 1}`
        ] = SelectedPartsCategory;
      }
    }
  }
  return SelectedParts;
};
