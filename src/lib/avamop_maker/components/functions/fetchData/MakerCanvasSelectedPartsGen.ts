import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

// パーツ名が入ったアバターメーカーのステータスオブジェクトを、実際の画像データが入ったオブジェクトに変換する
export const MakerCanvasSelectedPartsGen = (
  selectedParts: SelectedParts,
  partsObjectJimp: PartsObjectJimp,
  nullImage: Jimp
): SelectedPartsForCanvas => {
  const selectedPartsForCanvas: SelectedPartsForCanvas = {
    bodyType: selectedParts.bodyType,
    face: selectedParts.face,
    category: {},
    selectedColor: selectedParts.selectedColor,
    selectedFace: selectedParts.selectedFace,
  };
  const tmpSelectedPartsForCanvas: SelectedPartsForCanvasCategory = {};

  for (const tmpCategory in selectedParts.category) {
    let selectedPartsForCanvasSplit: SelectedPartsForCanvasSplit = {};
    for (const partSplit in partsObjectJimp[tmpCategory.replace(/_\d+$/, "")]
      .partList) {
      selectedPartsForCanvasSplit[partSplit] = {
        enableColor:
          selectedParts.category[tmpCategory].partName != ""
            ? partsObjectJimp[tmpCategory.replace(/_\d+$/, "")].partList[partSplit]
                .items[selectedParts.category[tmpCategory].partName].enableColor
            : false,
        colorGroup:
          partsObjectJimp[tmpCategory.replace(/_\d+$/, "")].partList[partSplit]
            .colorGroup,
        partOrder:
          partsObjectJimp[tmpCategory.replace(/_\d+$/, "")].partList[partSplit]
            .partOrder,
        partData:
          selectedParts.category[tmpCategory].partName != ""
            ? partsObjectJimp[tmpCategory.replace(/_\d+$/, "")].partList[partSplit]
                .items[selectedParts.category[tmpCategory].partName].faces["clear"]
                .jimpData
            : nullImage,
      };
    }
    tmpSelectedPartsForCanvas[tmpCategory] = {
      partSplit: selectedPartsForCanvasSplit,
      partFlip: selectedParts.category[tmpCategory].partFlip,
    };
  }
  // console.log(tmpSelectedPartsForCanvas);
  selectedPartsForCanvas.category = selectedPartsForCanvasSort(
    tmpSelectedPartsForCanvas
  );
  return selectedPartsForCanvas;
};

//パーツの順番を定め、カテゴリーの連番に伴って重複したパーツの順番値の分だけ加算する
const selectedPartsForCanvasSort = (
  selectedPartsForCanvasCategory: SelectedPartsForCanvasCategory
): SelectedPartsForCanvasCategory => {
  type Orders = { category: string; partSplit: string; partOrder: number };

  let partOrders: Orders[] = [];
  for (const category in selectedPartsForCanvasCategory) {
    for (const partSplit in selectedPartsForCanvasCategory[category].partSplit) {
      partOrders.push({
        category: category,
        partSplit: partSplit,
        partOrder:
          selectedPartsForCanvasCategory[category].partSplit[partSplit]
            .partOrder,
      });
    }
  }
  partOrders.sort((a, b) => {
    // partOrderが一致している場合、カテゴリ名に含まれる連番でソート
    if (a.partOrder === b.partOrder) {
      const numA = Number(
        a.category.match(/_(\d+)$/) ? a.category.match(/_(\d+)$/)[1] : 0
      );
      const numB = Number(
        b.category.match(/_(\d+)$/) ? b.category.match(/_(\d+)$/)[1] : 0
      );
      return numA - numB;
    }
    // partOrderが一致していない場合、partOrderでソート
    return a.partOrder - b.partOrder;
  });

  let increment: number = 0;
  let lastIncrement: number = 0;
  let splitIncrement: number = 0;
  let lastCategory: string = null;
  // 同じpartOrderがある場合に重複分だけ後の部分を加算
  for (let i = 0; i < partOrders.length; i++) {
    let category: string = partOrders[i].category.split("_")[0];
    let partOrder: number = partOrders[i].partOrder;

    if (lastCategory && category === lastCategory) {
      increment++;
    } else if (lastCategory && category !== lastCategory) {
      lastIncrement = lastIncrement + increment;
      increment = 0;
    }

    partOrders[i].partOrder =
      partOrder + splitIncrement + lastIncrement + increment;
    lastCategory = category;
  }

  let result: SelectedPartsForCanvasCategory = {};
  for (let i = 0; i < partOrders.length; i++) {
    let category = partOrders[i].category;
    let partSplit = partOrders[i].partSplit;
    if (!result[category]) {
      result[category] = {
        partSplit: {},
        partFlip: selectedPartsForCanvasCategory[category].partFlip,
      };
    }

    result[category].partSplit[partSplit] = {
      enableColor:
        selectedPartsForCanvasCategory[category].partSplit[partSplit]
          .enableColor,
      colorGroup:
        selectedPartsForCanvasCategory[category].partSplit[partSplit]
          .colorGroup,
      partOrder: partOrders[i].partOrder,
      partData:
        selectedPartsForCanvasCategory[category].partSplit[partSplit].partData,
    };
  }
  return result;
};
