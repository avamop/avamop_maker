// パーツ名が入ったアバターメーカーのステータスオブジェクトを、実際の画像データが入ったオブジェクトに変換する
export const MakerCanvasSelectedPartsGen = (
  selectedParts: SelectedParts,
  partsObjectJimp: PartsObjectJimp,
  selectedFace: string
): SelectedPartsForCanvas => {
  const selectedPartsForCanvas: SelectedPartsForCanvas = {
    bodyType: selectedParts.bodyType,
    category: {},
  };
  const tmpselectedPartsForCanvas: {
    [category: string]: SelectedPartsForCanvasCategory;
  } = {};

  for (const category in selectedParts.category) {
    for (const partSplit in partsObjectJimp[category.replace(/_\d+$/, "")]
      .partList) {
      const selectedPartsForCanvasCategory: SelectedPartsForCanvasCategory = {
        partOrder:
          partsObjectJimp[category.replace(/_\d+$/, "")].partList[partSplit]
            .partOrder,
        partData: partsObjectJimp[category.replace(/_\d+$/, "")].partList[
          partSplit
        ].items[selectedParts.category[category].partName].faces[selectedFace]
          ? partsObjectJimp[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[selectedParts.category[category].partName].faces[
              selectedFace
            ].jimpData
          : partsObjectJimp[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[selectedParts.category[category].partName].faces["clear"]
              .jimpData,
        partFlip: selectedParts.category[category].partFlip,
      };
      tmpselectedPartsForCanvas[category] = selectedPartsForCanvasCategory;
    }
  }
  selectedPartsForCanvas.category = selectedPartsForCanvasSort(
    tmpselectedPartsForCanvas
  );
  return selectedPartsForCanvas;
};

//パーツの順番を定め、カテゴリーの連番に伴って重複したパーツの順番値の分だけ加算する
const selectedPartsForCanvasSort = (tmpselectedPartsForCanvas: {
  [category: string]: SelectedPartsForCanvasCategory;
}): {
  [category: string]: SelectedPartsForCanvasCategory;
} => {
  let sortedCategories: [string, SelectedPartsForCanvasCategory][] =
    Object.entries(tmpselectedPartsForCanvas).sort((a, b) => {
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

  // オブジェクトに戻してselectedPartsForCanvasに代入
  return Object.fromEntries(sortedCategories);
};
