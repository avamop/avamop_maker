import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerConvertBase64 } from "./MakerConvertBase64";

export const MakerCombinePartIcon = async (
  buttonImages: ItemPeacesForCombine
): Promise<CombinePartIconBase64> => {
  const combineParts: FacesJimp = {};

  // 各peace内の画像を合成
  for (const peace in buttonImages) {
    const faces = buttonImages[peace].faces;
    for (const face in faces) {
      const faceData = faces[face].jimpData;
      if (!combineParts[face]) {
        combineParts[face] = {
          jimpData: faceData.clone(),
        };
      } else {
        combineParts[face].jimpData.composite(faceData, 0, 0);
      }
    }
  }

  // combineParts を base64 形式に変換
  const CombinePartIconBase64: CombinePartIconBase64 = {};
  for (const face in combineParts) {
    const base64Image = await MakerConvertBase64(combineParts[face].jimpData);
    CombinePartIconBase64[face] = {
      partBase64: base64Image,
    };
  }
  // console.log("executed" + "%o", CombinePartIconBase64)
  return CombinePartIconBase64;
};
