export const MakerConvertPartsList = (
  PartsObject: PartsObjectJimp
): PartsObjectIconForCombine => {
  const PartsObjectIconForCombine: PartsObjectIconForCombine = {};
  for (const category in PartsObject) {
    const convertPartList: ItemsIconForCombine = MakerConvertCategory(
      PartsObject[category].partList
    );
    PartsObjectIconForCombine[category] = {
      partList: convertPartList,
    };
  }
  return PartsObjectIconForCombine;
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
