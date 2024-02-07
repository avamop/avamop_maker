import "jimp/browser/lib/jimp";

export const MakerChangingColorsObject = (
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  selectedColorGroup: string,
  selectedPartSplit: string,
  enableChain: boolean,
  color: string | null,
  hueReverse: boolean | null,
  saturationReverse: boolean | null,
  hueGraph: ColorGraph | null,
  saturationGraph: ColorGraph | null,
  valueGraph: ColorGraph | null,
  selectedCategory: string,
  partsObject: PartsObjectSplit
): SelectedParts => {
  if (
    color === null &&
    hueReverse === null &&
    saturationReverse === null &&
    hueGraph === null &&
    saturationGraph === null &&
    valueGraph === null
  ) {
    return null;
  }
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
  if (selectedGroup["default"] === undefined) {
    selectedGroup["default"] = {
      ...selectedParts.selectedColor["none"]["default"],
    };
  }
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
              color: color ? color : defaultSplit.color,
              hueReverse:
                hueReverse === null ? defaultSplit.hueReverse : hueReverse,
              saturationReverse:
                saturationReverse === null
                  ? defaultSplit.saturationReverse
                  : saturationReverse,
              hueGraph: hueGraph === null ? defaultSplit.hueGraph : hueGraph,
              saturationGraph:
                saturationGraph === null
                  ? defaultSplit.saturationGraph
                  : saturationGraph,
              valueGraph:
                valueGraph === null ? defaultSplit.valueGraph : valueGraph,
            },
          }
        : {
            ...selectedGroup,
            [selectedPartSplit]: {
              color:
                color === null
                  ? selectedGroup[selectedPartSplit]
                    ? selectedGroup[selectedPartSplit].color
                    : defaultSplit.color
                  : color,
              hueReverse:
                hueReverse === null
                  ? selectedGroup[selectedPartSplit]
                    ? selectedGroup[selectedPartSplit].hueReverse
                    : defaultSplit.hueReverse
                  : hueReverse,
              saturationReverse:
                saturationReverse === null
                  ? selectedGroup[selectedPartSplit]
                    ? selectedGroup[selectedPartSplit].saturationReverse
                    : defaultSplit.saturationReverse
                  : saturationReverse,
              hueGraph:
                hueGraph === null
                  ? selectedGroup[selectedPartSplit]
                    ? selectedGroup[selectedPartSplit].hueGraph
                    : defaultSplit.hueGraph
                  : hueGraph,
              saturationGraph:
                saturationGraph === null
                  ? selectedGroup[selectedPartSplit]
                    ? selectedGroup[selectedPartSplit].saturationGraph
                    : defaultSplit.saturationGraph
                  : saturationGraph,
              valueGraph:
                valueGraph === null
                  ? selectedGroup[selectedPartSplit]
                    ? selectedGroup[selectedPartSplit].valueGraph
                    : defaultSplit.valueGraph
                  : valueGraph,
            },
          },
    },
    selectedFace: selectedParts.selectedFace,
  };
  setSelectedParts(updateColor);
  return updateColor;
};
