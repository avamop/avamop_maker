export const MakerConvertPartList = (
  partObject: PartObjectJimp
): PartObjectForCombine => {
  const PartObjectForCombine: PartObjectForCombine = {};
  for (const category in partObject) {
    const convertPartList: ItemsForCombine = MakerConvertCategory(
      partObject[category].partList
    );
    PartObjectForCombine[category] = {
      partList: convertPartList,
    };
  }
  return PartObjectForCombine;
};

const MakerConvertCategory = (categoryItems: CategoryJimp): ItemsForCombine => {
  const itemsForCombine: ItemsForCombine = {};
  for (const partSplit in categoryItems) {
    const partData = categoryItems[partSplit];
    for (const item in partData.items) {
      if (!itemsForCombine[item]) {
        itemsForCombine[item] = {
          bodyType: partData.items[item].bodyType,
          peaces: {},
        };
      } else {
        itemsForCombine[item].bodyType = partData.items[item].bodyType;
      }
      if (!itemsForCombine[item].peaces) {
        itemsForCombine[item].peaces = {};
      }
      itemsForCombine[item].peaces[partSplit] = {
        faces: partData.items[item].faces,
      };
    }
  }
  return itemsForCombine;
};
