export const mergeCategories = (data: PartsObject): PartsObjectSplit => {
  const SplitCategories: PartsObjectSplit = {};

  //partChainが一致するカテゴリを一纏めにする
  for (const category in data) {
    const currentCategory = data[category];
    const partChain = currentCategory.partChain;

    if (!SplitCategories[partChain]) {
      //SplitCategoriesにpartChainの値が存在しない場合は新規作成
      SplitCategories[partChain] = {
        colorGroup: currentCategory.colorGroup,
        partCount: currentCategory.partCount,
        partChain: partChain,
        ignoreTrigger: currentCategory.ignoreTrigger,
        partList: {},
      };
    }

    const currentPartList = SplitCategories[partChain].partList;

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

  return SplitCategories;
};
