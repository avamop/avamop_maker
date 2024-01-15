import "jimp/browser/lib/jimp";
import { JimpObject, JimpType } from "../../../types/jimp";

declare const Jimp: JimpObject;

// 画像をbase64形式に変換するだけ
export const MakerConvertBase64 = (image: JimpType): Promise<string> => {
  return image.getBase64Async(Jimp.MIME_PNG);
};
