import { MakerConvertPartsList } from "../objectProcess/MakerConvertPartsList";
import { MakerCombineMenuPartIcons } from "./MakerCombineMenuPartIcons";

export const MakerConvertPartsToMenuIcons = async (
  PartsObjectJimp: PartsObjectJimp
): Promise<CombinePartIconsObjectBase64> => {
  const PartsObjectIconForCombine = MakerConvertPartsList(PartsObjectJimp); //パーツを合成しやすくするためにオブジェクトを組み替える
  const menuPartIconList: CombinePartIconsObjectBase64 = {};
  for (const category in PartsObjectIconForCombine) {
    menuPartIconList[category] = {
      partList: {},
    };
    for (const item in PartsObjectIconForCombine[category].partList) {
      const partList: CombinePartIconsCategoryBase64 = {
        bodyType: PartsObjectIconForCombine[category].partList[item].bodyType,
        faces: await MakerCombineMenuPartIcons(
          PartsObjectIconForCombine[category].partList[item].peaces
        ), //同じパーツ名のパーツ画像を合成する
      };
      menuPartIconList[category].partList[item] = partList;
    }
  }
  return menuPartIconList;
};
