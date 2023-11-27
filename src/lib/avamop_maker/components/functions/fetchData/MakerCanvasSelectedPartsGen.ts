// パーツ名が入ったアバターメーカーのステータスオブジェクトを、実際の画像データが入ったオブジェクトに変換する
export const MakerCanvasSelectedPartsGen = (
  SelectedParts: SelectedParts,
  PartsObjectJimp: PartsObjectJimp,
  selectedFace: string
): SelectedPartsForCanvas => {
  const SelectedPartsForCanvas: SelectedPartsForCanvas = {
    bodyType: SelectedParts.bodyType,
    category: {},
  };
  const tmpSelectedPartsForCanvas: {
    [category: string]: SelectedPartsForCanvasCategory<typeof category>;
  } = {};

  for (const category in SelectedParts.category) {
    for (const partSplit in PartsObjectJimp[category.replace(/_\d+$/, "")]
      .partList) {
      const SelectedPartsForCanvasCategory: SelectedPartsForCanvasCategory<
        typeof category
      > = {
        partOrder:
          PartsObjectJimp[category.replace(/_\d+$/, "")].partList[partSplit]
            .partOrder,
        colorGroup: SelectedParts.category[category].colorGroup,
        partData: PartsObjectJimp[category.replace(/_\d+$/, "")].partList[
          partSplit
        ].items[SelectedParts.category[category].partName].faces[selectedFace]
          ? PartsObjectJimp[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[SelectedParts.category[category].partName].faces[
              selectedFace
            ].jimpData
          : PartsObjectJimp[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[SelectedParts.category[category].partName].faces["normal"]
              .jimpData,
        partColor: SelectedParts.category[category].partColor,
        partFlip: SelectedParts.category[category].partFlip,
      };
      tmpSelectedPartsForCanvas[category] = SelectedPartsForCanvasCategory;
    }
  }
  SelectedPartsForCanvas.category = SelectedPartsForCanvasSort(
    tmpSelectedPartsForCanvas
  );
  return SelectedPartsForCanvas;
};

//パーツの順番を定め、カテゴリーの連番に伴って重複したパーツの順番値の分だけ加算する
const SelectedPartsForCanvasSort = (tmpSelectedPartsForCanvas: {
  [category: string]: SelectedPartsForCanvasCategory<typeof category>;
}): {
  [category: string]: SelectedPartsForCanvasCategory<typeof category>;
} => {
  let sortedCategories: [
    string,
    SelectedPartsForCanvasCategory<"eye" | string>
  ][] = Object.entries(tmpSelectedPartsForCanvas).sort((a, b) => {
    // partOrderが一致している場合、カテゴリ名に含まれる連番でソート
    if (a[1].partOrder === b[1].partOrder) {
      const numA = Number(a[0].match(/_(\d+)$/) ? a[0].match(/_(\d+)$/)[1] : 0);
      const numB = Number(b[0].match(/_(\d+)$/) ? b[0].match(/_(\d+)$/)[1] : 0);
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

  // オブジェクトに戻してSelectedPartsForCanvasに代入
  return Object.fromEntries(sortedCategories);
};
