import { MakerConvertPartsList } from "../objectProcess/MakerConvertPartsList";
import { MakerCombineMenuPartIcons } from "./MakerCombineMenuPartIcons";

export const MakerConvertPartsToMenuIcons = async (
  partsObjectJimp: PartsObjectJimp
): Promise<CombinePartIconsObjectBase64> => {
  const partsObjectIconForCombine = MakerConvertPartsList(partsObjectJimp); //パーツを合成しやすくするためにオブジェクトを組み替える
  const menuPartIconList: CombinePartIconsObjectBase64 = {};
  for (const category in partsObjectIconForCombine) {
    menuPartIconList[category] = {
      partList: {},
    };
    for (const item in partsObjectIconForCombine[category].partList) {
      const partList: CombinePartIconsCategoryBase64 = {
        bodyType: partsObjectIconForCombine[category].partList[item].bodyType,
        faces: await MakerCombineMenuPartIcons(
          partsObjectIconForCombine[category].partList[item].peaces
        ), //同じパーツ名のパーツ画像を合成する
      };
      menuPartIconList[category].partList[item] = partList;
    }
  }
  return menuPartIconList;
};
