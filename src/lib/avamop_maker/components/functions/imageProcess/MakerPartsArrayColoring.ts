export const MakerPartsArrayColoring = (
  selectedParts: SelectedPartsForCanvas,
  partName: string,
  colorGroup: string,
  partSplit: string
) => {
  const colorObject = selectedParts.selectedColor[colorGroup][partSplit];
  const colorCode = colorObject.color;

  for (let i = 0; i < 10; i++) {}
};
