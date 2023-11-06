import 'jimp/browser/lib/jimp';
import type { Jimp } from 'jimp/browser/lib/jimp';

interface CombineParts {
  [faces: string]: {
    part: Jimp;
  }
}

export const MakerSplitCombine = async (buttonImages: PeaceCombined, path: string): Promise<CombinePartsBase64> => {
  const combineParts: CombineParts = {};

  // 各peace内の画像を合成
  for (const peace in buttonImages) {
    const faces = buttonImages[peace].faces;
    for (const face in faces) {
      const facePath = path + faces[face].facePath;
      // console.log(facePath)
      // 画像を読み込む
      const image = await Jimp.read(facePath);

      // combineParts に face 毎の Jimp インスタンスを格納
      if (!combineParts[face]) {
        combineParts[face] = {
          part: image.clone(),
        };
      } else {
        combineParts[face].part.composite(image, 0, 0);
      }
    }
  }

  // combineParts を base64 形式に変換
  const combinePartsBase64: CombinePartsBase64 = {};
  for (const face in combineParts) {
    const base64Image = await combineParts[face].part.getBase64Async(Jimp.MIME_PNG);
    combinePartsBase64[face] = {
      part: base64Image,
    };
  }
  // console.log("executed" + "%o", combinePartsBase64)
  return combinePartsBase64;
}
