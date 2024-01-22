export const mergeCategories = (data: PartsObject): PartsObjectSplit => {
  const splitCategories = {};
  const partOrders = new Set();

  for (const category in data) {
    const currentCategory = data[category];
    const partChain = currentCategory.partChain;

    if (partChain === "body") {
      for (const item in currentCategory.items)
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

    if (partOrders.has(currentCategory.partOrder)) {
      throw new Error(`Duplicate partOrder in category: ${category}`);
    }
    partOrders.add(currentCategory.partOrder);

    if (!splitCategories[partChain]) {
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
      currentPartList[category] = {
        colorGroup: currentCategory.colorGroup,
        partOrder: currentCategory.partOrder,
        items: currentCategory.items,
      };
    } else {
      const existingCategory = currentPartList[category];

      if (
        existingCategory.partOrder !== currentCategory.partOrder ||
        existingCategory.items !== currentCategory.items
      ) {
        throw new Error(`Mismatched properties in category: ${category}`);
      }
    }

    const allFacesKeys = new Set<string>();
    for (const category in currentPartList) {
      for (const item in currentPartList[category].items) {
        for (const face in currentPartList[category].items[item].faces) {
          allFacesKeys.add(face);
        }
      }
    }

    // faces の欠けているプロパティを補完する
    for (const category in currentPartList) {
      for (const item in currentPartList[category].items) {
        const faces = currentPartList[category].items[item].faces;
        for (const faceKey of allFacesKeys) {
          if (!faces[faceKey]) {
            faces[faceKey] = { imagePath: "" };
          }

          if (!faces.clear) {
            faces.clear = { imagePath: "" };
          }
        }
      }
    }
  }
  return splitCategories;
};
