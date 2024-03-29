import { MakerCombineMenuPartIcons } from "./MakerCombineMenuPartIcons";

export const MakerConvertPartsToMenuIcons = async (
  partsObjectJimp: PartsObjectJimp
): Promise<MenuPartIconsBase64> => {
  const partsObjectIconForCombine: MenuPartIcons =
    MakerConvertPartsList(partsObjectJimp); //パーツを合成しやすくするためにオブジェクトを組み替える
  const menuPartIconsList: MenuPartIconsBase64 = {};
  for (const category in partsObjectIconForCombine) {
    menuPartIconsList[category] = {
      partList: {},
    };
    for (const item in partsObjectIconForCombine[category].partList) {
      const partList: MenuPartIconsCategoryBase64 = {
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
): MenuPartIcons => {
  const partsObjectIconForCombine: MenuPartIcons = {};
  for (const category in partsObject) {
    const convertPartList: MenuPartIconItems = MakerConvertCategory(
      partsObject[category].partList
    );
    partsObjectIconForCombine[category] = {
      partList: convertPartList,
    };
  }
  return partsObjectIconForCombine;
};

//カテゴリー内のpartSplitで分けられてるパーツ画像をpeacesの中で分ける
export const MakerConvertCategory = (
  categoryItems: CategoryJimp
): MenuPartIconItems => {
  const itemsIconForCombine: MenuPartIconItems = {};
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
        partOrder: categoryItems[partSplit].partOrder,
        faces: partData.items[item].faces,
      };
    }
  }
  return itemsIconForCombine;
};
