export const MakerConvertPartList = (
  categoryItems: CategoryMerged
): CategoryItemsCombined<"body" | string> => {
  const categoryItemsCombined: CategoryItemsCombined<string> = {};
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
