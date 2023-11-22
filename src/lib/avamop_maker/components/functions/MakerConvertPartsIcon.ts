import { MakerConvertPartList } from "./MakerConvertPartList";
import { MakerCombinePartIcon } from "./MakerCombinePartIcon";

export const MakerConvertPartsIcon = async (
  partObjectJimp: PartObjectJimp
): Promise<CombinePartIconsObjectBase64> => {
  const partObjectForCombine = MakerConvertPartList(partObjectJimp); //パーツを合成しやすくするためにオブジェクトを組み替える
  const menuPartIconList: CombinePartIconsObjectBase64 = {};
  for (const category in partObjectForCombine) {
    menuPartIconList[category] = {
      partList: {},
    };
    for (const item in partObjectForCombine[category].partList) {
      const partList: CombinePartIconsCategoryBase64 = {
        bodyType: partObjectForCombine[category].partList[item].bodyType,
        faces: await MakerCombinePartIcon(
          partObjectForCombine[category].partList[item].peaces
        ), //同じパーツ名のパーツ画像を合成する
      };
      menuPartIconList[category].partList[item] = partList;
    }
  }
  return menuPartIconList;
};
