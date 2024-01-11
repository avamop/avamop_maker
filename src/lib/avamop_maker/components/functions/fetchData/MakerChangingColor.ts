export const MakerChangingColor = (
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  selectedColorGroup: string,
  selectedPartSplit: string,
  enableChain: boolean,
  color: string
) => {
  console.log(selectedColorGroup);
  let updateColor: SelectedParts = {
    bodyType: selectedParts.bodyType,
    face: selectedParts.face,
    category: selectedParts.category,
    selectedColor: {
      ...selectedParts.selectedColor,
      [selectedColorGroup]: {
        ...selectedParts.selectedColor[selectedColorGroup],
        [enableChain ? "default" : selectedPartSplit]: {
          color: color,
          hueShiftReverse: selectedParts.selectedColor[selectedColorGroup][
            enableChain ? "default" : selectedPartSplit
          ]
            ? selectedParts.selectedColor[selectedColorGroup][
                enableChain ? "default" : selectedPartSplit
              ].hueShiftReverse
            : selectedParts.selectedColor[selectedColorGroup]["default"]
                .hueShiftReverse,
          saturationReverse: selectedParts.selectedColor[selectedColorGroup][
            enableChain ? "default" : selectedPartSplit
          ]
            ? selectedParts.selectedColor[selectedColorGroup][
                enableChain ? "default" : selectedPartSplit
              ].saturationReverse
            : selectedParts.selectedColor[selectedColorGroup]["default"]
                .saturationReverse,
          hueGraph: selectedParts.selectedColor[selectedColorGroup][
            enableChain ? "default" : selectedPartSplit
          ]
            ? selectedParts.selectedColor[selectedColorGroup][
                enableChain ? "default" : selectedPartSplit
              ].hueGraph
            : selectedParts.selectedColor[selectedColorGroup]["default"]
                .hueGraph,
          saturationGraph: selectedParts.selectedColor[selectedColorGroup][
            enableChain ? "default" : selectedPartSplit
          ]
            ? selectedParts.selectedColor[selectedColorGroup][
                enableChain ? "default" : selectedPartSplit
              ].saturationGraph
            : selectedParts.selectedColor[selectedColorGroup]["default"]
                .saturationGraph,
          valueGraph: selectedParts.selectedColor[selectedColorGroup][
            enableChain ? "default" : selectedPartSplit
          ]
            ? selectedParts.selectedColor[selectedColorGroup][
                enableChain ? "default" : selectedPartSplit
              ].valueGraph
            : selectedParts.selectedColor[selectedColorGroup]["default"]
                .valueGraph,
        },
      },
    },
    selectedFace: selectedParts.selectedFace,
  };

  setSelectedParts(updateColor);
};
