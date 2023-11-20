import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

export const MakerConvertBase64 = (image: Jimp): Promise<string> => {
  return image.getBase64Async(Jimp.MIME_PNG);
};
