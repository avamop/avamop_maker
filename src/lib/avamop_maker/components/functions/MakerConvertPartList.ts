export const MakerConvertPartList = (
  partObject: PartObjectMerged
): ConvertPartObject => {
  const convertPartObject: ConvertPartObject = {};
  for (const category in partObject) {
    const convertPartList: CategoryItemsCombined = MakerConvertCategory(
      partObject[category].partList
    );
    convertPartObject[category] = {
      partList: convertPartList,
    };
  }
  return convertPartObject;
};

const MakerConvertCategory = (
  categoryItems: CategoryMerged
): CategoryItemsCombined => {
  const categoryItemsCombined: CategoryItemsCombined = {};
  for (const partSplit in categoryItems) {
    const partData = categoryItems[partSplit];
    for (const item in partData.items) {
      if (!categoryItemsCombined[item]) {
        categoryItemsCombined[item] = {
          bodyType: partData.items[item].bodyType,
          peaces: {},
        };
      } else {
        categoryItemsCombined[item].bodyType = partData.items[item].bodyType;
      }
      if (!categoryItemsCombined[item].peaces) {
        categoryItemsCombined[item].peaces = {};
      }
      categoryItemsCombined[item].peaces[partSplit] = {
        faces: partData.items[item].faces,
      };
    }
  }
  return categoryItemsCombined;
};
