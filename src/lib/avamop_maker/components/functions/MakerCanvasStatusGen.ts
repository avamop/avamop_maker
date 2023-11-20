export const MakerCanvasStatusGen = (
  selectedParts: ViewStatus,
  partObject: PartObjectMerged,
  selectedFace: string
): CanvasObject => {
  const canvasObject: CanvasObject = {
    bodyType: selectedParts.bodyType,
    category: {},
  };
  const tmpCanvasObject: {
    [category: string]: CanvasObjectCategory<typeof category>;
  } = {};

  for (const category in selectedParts.category) {
    for (const partSplit in partObject[category.replace(/_\d+$/, "")]
      .partList) {
      const canvasObjectCategory: CanvasObjectCategory<typeof category> = {
        partOrder:
          partObject[category.replace(/_\d+$/, "")].partList[partSplit]
            .partOrder,
        colorGroup: selectedParts.category[category].colorGroup,
        partPath: partObject[category.replace(/_\d+$/, "")].partList[partSplit]
          .items[selectedParts.category[category].partName].faces[selectedFace]
          ? partObject[category.replace(/_\d+$/, "")].partList[partSplit].items[
              selectedParts.category[category].partName
            ].faces[selectedFace].facePath
          : partObject[category.replace(/_\d+$/, "")].partList[partSplit].items[
              selectedParts.category[category].partName
            ].faces["normal"].facePath,
        partColor: selectedParts.category[category].partColor,
      };
      tmpCanvasObject[category] = canvasObjectCategory;
    }
  }
  canvasObject.category = CanvasObjectSort(tmpCanvasObject);
  return canvasObject;
};

const CanvasObjectSort = (tmpCanvasObject: {
  [category: string]: CanvasObjectCategory<typeof category>;
}): {
  [category: string]: CanvasObjectCategory<typeof category>;
} => {
  let sortedCategories: [string, CanvasObjectCategory<"eye" | string>][] =
    Object.entries(tmpCanvasObject).sort((a, b) => {
      // partOrderが一致している場合、カテゴリ名に含まれる連番でソート
      if (a[1].partOrder === b[1].partOrder) {
        const numA = Number(
          a[0].match(/_(\d+)$/) ? a[0].match(/_(\d+)$/)[1] : 0
        );
        const numB = Number(
          b[0].match(/_(\d+)$/) ? b[0].match(/_(\d+)$/)[1] : 0
        );
        return numA - numB;
      }
      // partOrderが一致していない場合、partOrderでソート
      return a[1].partOrder - b[1].partOrder;
    });
  let increment: number = 0;
  let lastIncrement: number = 0;
  let lastCategory: string = null;
  // 同じpartOrderがある場合に重複分だけ後の部分を加算
  for (let i = 0; i < sortedCategories.length; i++) {
    let category = sortedCategories[i][0].split("_")[0];
    let partOrder = sortedCategories[i][1].partOrder;

    if (lastCategory && category === lastCategory) {
      increment++;
    } else if (lastCategory && category !== lastCategory) {
      lastIncrement = lastIncrement + increment;
      increment = 0;
    }

    sortedCategories[i][1].partOrder = partOrder + lastIncrement + increment;
    lastCategory = category;
  }

  // オブジェクトに戻してcanvasObjectに代入
  return Object.fromEntries(sortedCategories);
};
