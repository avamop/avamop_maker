import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerPartsColoring } from "./MakerPartsColoring";

export const MakerLayerCombineParts = async (
  selectedPartsForCanvas: SelectedPartsForCanvas,
  colorsObject: ColorsObject
): Promise<Jimp[]> => {
  type Orders = {
    category: string;
    partSplit: string;
    partOrder: number;
    partData: Jimp;
  };
  // console.log(selectedPartsForCanvas);
  let partIndividual: string = "";
  let sortedParts: Orders[] = [];
  for (let category in selectedPartsForCanvas.category) {
    for (let partSplit in selectedPartsForCanvas.category[category].partSplit) {
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
