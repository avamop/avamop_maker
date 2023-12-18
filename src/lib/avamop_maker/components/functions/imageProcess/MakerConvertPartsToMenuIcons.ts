import { MakerCombineMenuPartIcons } from "./MakerCombineMenuPartIcons";

export const MakerConvertPartsToMenuIcons = async (
  partsObjectJimp: PartsObjectJimp
): Promise<CombinePartIconsObjectBase64> => {
  const partsObjectIconForCombine: PartsObjectIconForCombine =
    MakerConvertPartsList(partsObjectJimp); //パーツを合成しやすくするためにオブジェクトを組み替える
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

export const MakerConvertPartsList = (
  partsObject: PartsObjectJimp
): PartsObjectIconForCombine => {
  const partsObjectIconForCombine: PartsObjectIconForCombine = {};
  for (const category in partsObject) {
    const convertPartList: ItemIconsForCombine = MakerConvertCategory(
      partsObject[category].partList
    );
    partsObjectIconForCombine[category] = {
      partList: convertPartList,
    };
  }
  return partsObjectIconForCombine;
};

//カテゴリー内のpartSplitで分けられてるパーツ画像をpeacesの中で分ける
const MakerConvertCategory = (
  categoryItems: CategoryJimp
): ItemIconsForCombine => {
  const itemsIconForCombine: ItemIconsForCombine = {};
  for (const partSplit in categoryItems) {
    const partData = categoryItems[partSplit];
    for (const item in partData.items) {
      if (!itemsIconForCombine[item]) {
        itemsIconForCombine[item] = {
          bodyType: partData.items[item].bodyType,
          peaces: {},
        };
      } else {
        itemsIconForCombine[item].bodyType = partData.items[item].bodyType;
      }
      if (!itemsIconForCombine[item].peaces) {
        itemsIconForCombine[item].peaces = {};
      }
      itemsIconForCombine[item].peaces[partSplit] = {
        faces: partData.items[item].faces,
      };
    }
  }
  return itemsIconForCombine;
};
