export const MakerConvertPartsList = (
  partsObject: PartsObjectJimp
): PartsObjectIconForCombine => {
  const partsObjectIconForCombine: PartsObjectIconForCombine = {};
  for (const category in partsObject) {
    const convertPartList: ItemsIconForCombine = MakerConvertCategory(
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
): ItemsIconForCombine => {
  const itemsIconForCombine: ItemsIconForCombine = {};
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
