import Jimp from "jimp/browser/lib/jimp";
import { JimpObject } from "../types/jimp";

// 画像をbase64形式に変換するだけ
export const MakerConvertBase64 = (image: Jimp): Promise<string> => {
  return image.getBase64Async(Jimp.MIME_PNG);
};
