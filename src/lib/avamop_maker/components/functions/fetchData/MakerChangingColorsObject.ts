import "jimp/browser/lib/jimp";

export const MakerChangingColorsObject = async (
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  selectedColorGroup: string,
  selectedPartSplit: string,
  enableChain: boolean,
  color: string | null,
  hueShiftReverse: boolean | null,
  saturationReverse: boolean | null,
  hueGraph: ColorGraph | null,
  saturationGraph: ColorGraph | null,
  valueGraph: ColorGraph | null,
  selectedCategory: string,
  partsObject: PartsObjectSplit
) => {
  if (
    !color &&
    !hueShiftReverse &&
    !saturationReverse &&
    !hueGraph &&
    !saturationGraph &&
    !valueGraph
  ) {
    return;
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
              hueShiftReverse: hueShiftReverse
                ? hueShiftReverse
                : defaultSplit.hueShiftReverse,
              saturationReverse: saturationReverse
                ? saturationReverse
                : defaultSplit.saturationReverse,
              hueGraph: hueGraph ? hueGraph : defaultSplit.hueGraph,
              saturationGraph: saturationGraph
                ? saturationGraph
                : defaultSplit.saturationGraph,
              valueGraph: valueGraph ? valueGraph : defaultSplit.valueGraph,
            },
          }
        : {
            ...selectedGroup,
            [selectedPartSplit]: {
              color: color
                ? color
                : selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].color
                : defaultSplit.color,
              hueShiftReverse: hueShiftReverse
                ? hueShiftReverse
                : selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].hueShiftReverse
                : defaultSplit.hueShiftReverse,
              saturationReverse: saturationReverse
                ? saturationReverse
                : selectedParts.selectedColor[selectedColorGroup][
                    selectedPartSplit
                  ]
                ? selectedGroup[selectedPartSplit].saturationReverse
                : defaultSplit.saturationReverse,
              hueGraph: hueGraph
                ? hueGraph
                : selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].hueGraph
                : defaultSplit.hueGraph,
              saturationGraph: saturationGraph
                ? saturationGraph
                : selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].saturationGraph
                : defaultSplit.saturationGraph,
              valueGraph: valueGraph
                ? valueGraph
                : selectedGroup[selectedPartSplit]
                ? selectedGroup[selectedPartSplit].valueGraph
                : defaultSplit.valueGraph,
            },
          },
    },
    selectedFace: selectedParts.selectedFace,
  };
  setSelectedParts(updateColor);
};
