export const MakerConvertPartList = (categoryItems: CategoryMerged): CategoryItemsCombined => {
  const categoryItemsCombined: CategoryItemsCombined = {};
  for (const partSplit in categoryItems) {
    const partData = categoryItems[partSplit];
    for (const item in partData.items) {
      if (!categoryItemsCombined[item]) {
        categoryItemsCombined[item] = {
          body: partData.items[item].body,
          peaces: {}
        };
      } else {
        categoryItemsCombined[item].body = partData.items[item].body;
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
}
