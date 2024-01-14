import "jimp/browser/lib/jimp";
import { JimpObject } from "../types/jimp";

export const MakerLayerCombineParts = async (
  selectedPartsForCanvas: SelectedPartsForCanvas
): Promise<Jimp[]> => {
  type Orders = {
    category: string;
    partSplit: string;
    partOrder: number;
    partData: Jimp;
  };
  // console.log(selectedPartsForCanvas);
  let sortedParts: Orders[] = [];
  for (const category in selectedPartsForCanvas.category) {
    for (const partSplit in selectedPartsForCanvas.category[category]
      .partSplit) {
      sortedParts.push({
        category: category,
        partSplit: partSplit,
        partOrder:
          selectedPartsForCanvas.category[category].partSplit[partSplit]
            .partOrder,
        partData:
          selectedPartsForCanvas.category[category].partSplit[partSplit]
            .partData,
      });
    }
  }
  sortedParts.sort((a, b) => {
    // partOrderが一致していない場合、partOrderでソート
    return a.partOrder - b.partOrder;
  });
  // console.log(sortedParts);
  // 最初の画像をベースにする

  const imageArray: Jimp[] = [];

  // 残りの画像を合成
  for (let i = 0; i < sortedParts.length; i++) {
    imageArray.push(sortedParts[i].partData);
  }
  return imageArray;
};
