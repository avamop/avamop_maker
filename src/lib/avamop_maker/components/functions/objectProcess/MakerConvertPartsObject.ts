export const mergeCategories = (data: PartsObject): PartsObjectSplit => {
  const splitCategories: PartsObjectSplit = {};
  const partOrders: Set<number> = new Set();

  for (const category in data) {
    const currentCategory = data[category];
    const partChain = currentCategory.partChain;

    // チェック: data["body"].items.bodyTypeプロパティがlength数1の文字列配列になっているかどうか
    if (partChain === "body") {
      for (const item in currentCategory[category].items)
        if (
          !Array.isArray(currentCategory.items[item].bodyType) ||
          currentCategory.items[item].bodyType.length !== 1 ||
          typeof currentCategory.items[item].bodyType[0] !== "string"
        ) {
          throw new Error(
            `Invalid bodyType in category: ${category},${partChain}`
          );
        }
    }

    // チェック: 全てのpartOrderの数値に被りがないかどうか
    if (partOrders.has(currentCategory.partOrder)) {
      throw new Error(`Duplicate partOrder in category: ${category}`);
    }
    partOrders.add(currentCategory.partOrder);

    if (!splitCategories[partChain]) {
      //splitCategoriesにpartChainの値が存在しない場合は新規作成
      splitCategories[partChain] = {
        partCount: currentCategory.partCount,
        partChain: partChain,
        ignoreTrigger: currentCategory.ignoreTrigger,
        partFlip: currentCategory.partFlip,
        partList: {},
      };
    }

    const currentPartList = splitCategories[partChain].partList;

    if (!currentPartList[category]) {
      // currentPartListにcategoryの値が存在しない場合は新規作成
      currentPartList[category] = {
        colorGroup: currentCategory.colorGroup,
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

  return splitCategories;
};
