import "jimp/browser/lib/jimp";
import { MakerPartIconsTrim } from "./MakerPartIconsTrim";
import { MakerConvertBase64 } from "./MakerConvertBase64";

export const MakerCombineMenuPartIcons = async (
  buttonImages: ItemPeacesIconForCombine
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
    const base64Image: string = await MakerConvertBase64(
      await MakerPartIconsTrim(combineParts[face].jimpData)
    );
    CombinePartIconBase64[face] = {
      imagePath: base64Image,
    };
  }
  return CombinePartIconBase64;
};
