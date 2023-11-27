import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

export const MakerLayerCombineParts = async (
  selectedPartsForCanvas: SelectedPartsForCanvas
): Promise<Jimp> => {
  // カテゴリをpartOrderでソート
  const sortedCategories = Object.values(selectedPartsForCanvas.category).sort(
    (a, b) => a.partOrder - b.partOrder
  );

  // 最初の画像をベースにする
  let baseImage = sortedCategories[0].partData;

  // 残りの画像を合成
  for (let i = 1; i < sortedCategories.length; i++) {
    baseImage = await baseImage.composite(sortedCategories[i].partData, 0, 0);
  }
  return baseImage;
};
