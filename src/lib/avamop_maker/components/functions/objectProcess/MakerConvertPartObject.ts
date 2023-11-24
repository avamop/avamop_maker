export const mergeCategories = (data: PartObject): PartObjectMerged => {
  const mergedCategories: PartObjectMerged = {};

  //partChainが一致するカテゴリを一纏めにする
  for (const category in data) {
    const currentCategory = data[category];
    const partChain = currentCategory.partChain;

    if (!mergedCategories[partChain]) {
      //mergedCategoriesにpartChainの値が存在しない場合は新規作成
      mergedCategories[partChain] = {
        colorGroup: currentCategory.colorGroup,
        partCount: currentCategory.partCount,
        partChain: partChain,
        ignoreTrigger: currentCategory.ignoreTrigger,
        partList: {},
      };
    }

    const currentPartList = mergedCategories[partChain].partList;

    if (!currentPartList[category]) {
      // currentPartListにcategoryの値が存在しない場合は新規作成
      currentPartList[category] = {
        partOrder: currentCategory.partOrder,
        items: currentCategory.items,
      };
    } else {
      // currntPartListにCategoryの値がある場合は比較してエラーチェック
      const existingCategory = currentPartList[category];

      if (
        existingCategory.partOrder !== currentCategory.partOrder ||
        existingCategory.items !== currentCategory.items
      ) {
        throw new Error(`Mismatched properties in category: ${category}`);
      }
    }
  }

  return mergedCategories;
};
