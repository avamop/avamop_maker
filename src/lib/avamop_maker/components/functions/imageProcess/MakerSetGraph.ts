import React from "react";
import { JimpObject, JimpType } from "../../../types/jimp";
import { MakerHandleChangeColor } from "./MakerHandleChangeColor";

export const changeHueGlobalScope = (
  event: React.ChangeEvent<HTMLInputElement>,
  hueGlobalSlope: number,
  setHueGlobalSlope: React.Dispatch<React.SetStateAction<number>>,
  hueGraph: ColorGraph,
  setHueGraph: React.Dispatch<React.SetStateAction<ColorGraph>>,
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  selectedColorGroup: string,
  selectedPartSplit: string,
  enableChain: boolean,
  selectedCategory: string,
  partsObject: PartsObjectSplit,
  partsObjectJimp: PartsObjectJimp,
  setPartsObjectJimp: React.Dispatch<React.SetStateAction<PartsObjectJimp>>,
  colorsObject: ColorsObject,
  partsPath: string,
  menuPartIcons: MenuPartIconsBase64,
  setMenuPartIcons: React.Dispatch<React.SetStateAction<MenuPartIconsBase64>>,
  nullImage: JimpType
) => {
  // if (isPressed) {
  let changeHue = Number(event.target.value);
  // console.log(changeHue);
  setHueGlobalSlope(changeHue);
  setHueGraph({
    globalSlope: hueGlobalSlope,
    individualSlope: hueGraph.individualSlope,
  });
  MakerHandleChangeColor(
    selectedParts,
    setSelectedParts,
    selectedColorGroup,
    selectedPartSplit,
    enableChain,
    null,
    null,
    null,
    hueGraph,
    null,
    null,
    selectedCategory,
    partsObject,
    partsObjectJimp,
    setPartsObjectJimp,
    colorsObject,
    partsPath,
    menuPartIcons,
    setMenuPartIcons,
    nullImage
  );
  // }
};

export const changeSaturationGlobalScope = (
  event: React.ChangeEvent<HTMLInputElement>,
  saturationGlobalSlope: number,
  setSaturationGlobalSlope: React.Dispatch<React.SetStateAction<number>>,
  saturationGraph: ColorGraph,
  setSaturationGraph: React.Dispatch<React.SetStateAction<ColorGraph>>,
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  selectedColorGroup: string,
  selectedPartSplit: string,
  enableChain: boolean,
  selectedCategory: string,
  partsObject: PartsObjectSplit,
  partsObjectJimp: PartsObjectJimp,
  setPartsObjectJimp: React.Dispatch<React.SetStateAction<PartsObjectJimp>>,
  colorsObject: ColorsObject,
  partsPath: string,
  menuPartIcons: MenuPartIconsBase64,
  setMenuPartIcons: React.Dispatch<React.SetStateAction<MenuPartIconsBase64>>,
  nullImage: JimpType
) => {
  // if (isPressed) {
  let changeSaturation = Number(event.target.value);
  // console.log(changeSaturation);
  setSaturationGlobalSlope(changeSaturation);
  setSaturationGraph({
    globalSlope: saturationGlobalSlope,
    individualSlope: saturationGraph.individualSlope,
  });
  MakerHandleChangeColor(
    selectedParts,
    setSelectedParts,
    selectedColorGroup,
    selectedPartSplit,
    enableChain,
    null,
    null,
    null,
    null,
    saturationGraph,
    null,
    selectedCategory,
    partsObject,
    partsObjectJimp,
    setPartsObjectJimp,
    colorsObject,
    partsPath,
    menuPartIcons,
    setMenuPartIcons,
    nullImage
  );
  // }
};

export const changeValueGlobalScope = (
  event: React.ChangeEvent<HTMLInputElement>,
  valueGlobalSlope: number,
  setValueGlobalSlope: React.Dispatch<React.SetStateAction<number>>,
  valueGraph: ColorGraph,
  setValueGraph: React.Dispatch<React.SetStateAction<ColorGraph>>,
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  selectedColorGroup: string,
  selectedPartSplit: string,
  enableChain: boolean,
  selectedCategory: string,
  partsObject: PartsObjectSplit,
  partsObjectJimp: PartsObjectJimp,
  setPartsObjectJimp: React.Dispatch<React.SetStateAction<PartsObjectJimp>>,
  colorsObject: ColorsObject,
  partsPath: string,
  menuPartIcons: MenuPartIconsBase64,
  setMenuPartIcons: React.Dispatch<React.SetStateAction<MenuPartIconsBase64>>,
  nullImage: JimpType
) => {
  // if (isPressed) {
  let changeValue = Number(event.target.value);
  // console.log(changeValue);
  setValueGlobalSlope(changeValue);
  setValueGraph({
    globalSlope: valueGlobalSlope,
    individualSlope: valueGraph.individualSlope,
  });
  MakerHandleChangeColor(
    selectedParts,
    setSelectedParts,
    selectedColorGroup,
    selectedPartSplit,
    enableChain,
    null,
    null,
    null,
    null,
    null,
    valueGraph,
    selectedCategory,
    partsObject,
    partsObjectJimp,
    setPartsObjectJimp,
    colorsObject,
    partsPath,
    menuPartIcons,
    setMenuPartIcons,
    nullImage
  );
  // }
};
