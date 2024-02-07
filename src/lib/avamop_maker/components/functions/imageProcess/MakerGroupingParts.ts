export const MakerGroupingParts = (
  selectedPartsForCanvas: SelectedPartsForCanvas,
  selectedCategory: string
): { [colorGroup: string]: string[] } => {
  let groupedParts: { [colorGroup: string]: string[] } = {};
  Object.keys(
    selectedPartsForCanvas.category[selectedCategory].partSplit
  ).forEach((partSplit) => {
    let colorGroup =
      selectedPartsForCanvas.category[selectedCategory].partSplit[partSplit]
        .colorGroup;
    if (!groupedParts[colorGroup]) {
      groupedParts[colorGroup] = [];
    }
    groupedParts[colorGroup].push(partSplit);
  });
  return groupedParts;
};
