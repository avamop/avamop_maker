export const MakerViewStatusGen = (
  partObject: PartObjectMerged
): ViewStatus => {
  const viewStatus: ViewStatus = { bodyType: null, category: {} };
  const bodyTypeValue =
    partObject["body"].partList["body"].items[
      Object.keys(partObject["body"].partList["body"].items)[0]
    ].bodyType;
  try {
    if (bodyTypeValue === null) {
      throw new Error(`エラー:bodyのbodyTypeプロパティに値がありません`);
    } else if (bodyTypeValue.length > 1) {
      throw new Error("エラー:bodyのbodyTypeプロパティが複数あります");
    } else if (bodyTypeValue[0] == 0) {
      throw new Error("エラー:bodyのbodyTypeプロパティが0になっています");
    } else {
      viewStatus.bodyType = bodyTypeValue[0];
    }
  } catch (error) {
    console.error(error.message);
  }
  for (const category in partObject) {
    const { partList, partCount, colorGroup } = partObject[category];
    const partSplits = Object.keys(partList);

    for (let i = 0; i < partCount; i++) {
      const partSplit = partSplits[0];
      const partName = Object.keys(
        partObject[category].partList[partSplit].items
      )[0];
      if (colorGroup === "eye") {
        const viewStatusCategory: ViewStatusCategory<"eye"> = {
          colorGroup,
          partName,
          partColor: { left: "black", right: "black" },
        };
        viewStatus[partCount === 1 ? category : `${category}_${i + 1}`] =
          viewStatusCategory;
      } else {
        const viewStatusCategory: ViewStatusCategory<string> = {
          colorGroup,
          partName,
          partColor:
            colorGroup === ("hair" || "highlight" || "beard")
              ? "suddleBrown"
              : colorGroup === "skin"
              ? "bisque"
              : "gray",
        };
        viewStatus.category[
          partCount === 1 ? category : `${category}_${i + 1}`
        ] = viewStatusCategory;
      }
    }
  }
  return viewStatus;
};
