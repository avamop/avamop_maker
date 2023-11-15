export const MakerViewStatusGen = (
  partObject: PartObjectMerged
): ViewStatus => {
  const viewStatus: ViewStatus = { bodyType: null, category: {} };
  const bodyTypeValue =
    partObject["body"].partList["body"].items[
      Object.keys(partObject["body"].partList["body"].items)[0]
    ].bodyType;
  try {
    if (Array.isArray(bodyTypeValue)) {
      throw new Error("エラー:bodyプロパティが配列になっています");
    }
    viewStatus.bodyType = bodyTypeValue;
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
