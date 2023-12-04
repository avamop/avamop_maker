import { MakerConvertPartsList } from "../objectProcess/MakerConvertPartsList";
import { MakerCombineMenuPartIcons } from "./MakerCombineMenuPartIcons";

export const MakerConvertPartsToMenuIcons = async (
  partsObjectJimp: PartsObjectJimp
): Promise<CombinePartIconsObjectBase64> => {
  const partsObjectIconForCombine = MakerConvertPartsList(partsObjectJimp); //パーツを合成しやすくするためにオブジェクトを組み替える
  const menuPartIconsList: CombinePartIconsObjectBase64 = {};
  for (const category in partsObjectIconForCombine) {
    menuPartIconsList[category] = {
      partList: {},
    };
    for (const item in partsObjectIconForCombine[category].partList) {
      const partList: CombinePartIconsCategoryBase64 = {
        bodyType: partsObjectIconForCombine[category].partList[item].bodyType,
        faces: await MakerCombineMenuPartIcons(
          partsObjectIconForCombine[category].partList[item].peaces
        ), //同じパーツ名のパーツ画像を合成する
      };
      menuPartIconsList[category].partList[item] = partList;
    }
  }
  return menuPartIconsList;
};
