import React from "react";
import { MakerSearchIgnoreTrigger } from "./MakerSearchIgnoreTrigger";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

export const MakerChangingPart = (
  category: string,
  partNameValue: string,
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  selectedPartsForCanvas: SelectedPartsForCanvas,
  setSelectedPartsForCanvas: React.Dispatch<
    React.SetStateAction<SelectedPartsForCanvas>
  >,
  partsObject: PartsObjectSplit,
  partsObjectJimp: PartsObjectJimp,
  nullImage: Jimp
) => {
  let updateAvaters: SelectedParts = {
    bodyType: category === "body" ? partNameValue : selectedParts.bodyType,
    face: selectedParts.face,
    category: {
      ...selectedParts.category,
      [category]: {
        ...selectedParts.category[category],
        partName: partNameValue,
        partFlip: selectedParts.category[category].partFlip,
      },
    },
    selectedColor: selectedParts.selectedColor,
    selectedFace: selectedParts.selectedFace,
  };
  let updateAvatersForCanvas: SelectedPartsForCanvas = {
    bodyType: updateAvaters.bodyType,
    face: updateAvaters.face,
    category: {
      ...selectedPartsForCanvas.category,
      [category]: {
        ...selectedPartsForCanvas.category[category],
        partSplit: partSplitProcess(
          partsObjectJimp[category.replace(/_\d+$/, "")].partList,
          partNameValue,
          selectedPartsForCanvas.selectedFace[category],
          nullImage,
          false
        ),
        partFlip: selectedPartsForCanvas.category[category].partFlip,
      },
    },
    selectedColor: updateAvaters.selectedColor,
    selectedFace: updateAvaters.selectedFace,
  };
  const ignoreTriggerList: string[] = MakerSearchIgnoreTrigger(
    partsObject,
    category
  );
  if (ignoreTriggerList) {
    ignoreTriggerList.forEach((ignoreTrigger) => {
      updateAvaters.category[ignoreTrigger] = {
        ...selectedParts.category[ignoreTrigger],
        partName: "",
        partFlip: selectedParts.category[ignoreTrigger].partFlip,
      };
      updateAvatersForCanvas.category[ignoreTrigger] = {
        ...selectedPartsForCanvas.category[ignoreTrigger],
        partSplit: partSplitProcess(
          partsObjectJimp[category].partList,
          partNameValue,
          selectedPartsForCanvas.selectedFace[category],
          nullImage,
          true
        ),
      };
    });
  }
  if (category === "body") {
    for (const tmpCategory in selectedParts.category) {
      if (tmpCategory !== "body") {
        selectedParts.category[tmpCategory].partName !== ""
          ? (updateAvaters.category[tmpCategory].partName =
              !partsObject[tmpCategory].partList[
                Object.keys(partsObject[tmpCategory].partList)[0]
              ].items[selectedParts.category[tmpCategory].partName].bodyType ||
              partsObject[tmpCategory].partList[
                Object.keys(partsObject[tmpCategory].partList)[0]
              ].items[
                selectedParts.category[tmpCategory].partName
              ].bodyType.includes(partNameValue)
                ? selectedParts.category[tmpCategory].partName
                : "")
          : "";
      }
      for (const partSplit in partsObject[tmpCategory].partList) {
        if (
          !selectedParts.selectedColor[
            partsObject[tmpCategory].partList[partSplit].colorGroup
          ]
        ) {
          selectedParts.selectedColor[
            partsObject[tmpCategory].partList[partSplit].colorGroup
          ] = {
            default: {
              color: selectedParts.selectedColor["none"]["default"].color,
              hueShiftReverse:
                selectedParts.selectedColor["none"]["default"].hueShiftReverse,
              saturationReverse:
                selectedParts.selectedColor["none"]["default"]
                  .saturationReverse,
              hueGraph: selectedParts.selectedColor["none"]["default"].hueGraph,
              saturationGraph:
                selectedParts.selectedColor["none"]["default"].saturationGraph,
              valueGraph:
                selectedParts.selectedColor["none"]["default"].valueGraph,
            },
          };
        }
      }
    }
  }
  setSelectedParts(updateAvaters);
  setSelectedPartsForCanvas(updateAvatersForCanvas);
};

export default MakerChangingPart;

const partSplitProcess = (
  partListSplit: CategoryJimp,
  partNameValue: string,
  face: string,
  nullImage: Jimp,
  ignoreTrigger: boolean
) => {
  let partSplitUpdate: SelectedPartsForCanvasSplit = {};
  for (const partSplitPeace in partListSplit) {
    partSplitUpdate[partSplitPeace] = {
      enableColor: ignoreTrigger
        ? false
        : partListSplit[partSplitPeace].items[partNameValue]
        ? partListSplit[partSplitPeace].items[partNameValue].enableColor
        : false,
      colorGroup: partListSplit[partSplitPeace].colorGroup,
      partOrder: partListSplit[partSplitPeace].partOrder,
      partData: ignoreTrigger
        ? nullImage
        : partListSplit[partSplitPeace].items[partNameValue]
        ? partListSplit[partSplitPeace].items[partNameValue].faces[face]
          ? partListSplit[partSplitPeace].items[partNameValue].faces[face]
              .jimpData
          : partListSplit[partSplitPeace].items[partNameValue].faces["clear"]
              .jimpData
        : nullImage,
    };
  }
  return partSplitUpdate;
};
