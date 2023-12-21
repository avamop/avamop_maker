import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

export const MakerPartsColoring = async (
  image: Jimp,
  oldColor: string,
  newColor: string
): Promise<Jimp> => {
  const oldRGB: number = Jimp.cssColorToHex(oldColor);
  const newRGB: number = Jimp.cssColorToHex(newColor);

  const oldRed: number = (oldRGB >> 16) & 255;
  const oldGreen: number = (oldRGB >> 8) & 255;
  const oldBlue: number = oldRGB & 255;

  const newRed: number = (newRGB >> 16) & 255;
  const newGreen: number = (newRGB >> 8) & 255;
  const newBlue: number = newRGB & 255;

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const alpha: number = image.bitmap.data[idx + 3];
    if (alpha === 0) {
      //透明ピクセルの場合、処理をスキップする
      return;
    }

    const red: number = image.bitmap.data[idx + 0];
    const green: number = image.bitmap.data[idx + 1];
    const blue: number = image.bitmap.data[idx + 2];
    if (red === oldRed && green === oldGreen && blue === oldBlue) {
      image.bitmap.data[idx + 0] = newRed;
      image.bitmap.data[idx + 1] = newGreen;
      image.bitmap.data[idx + 2] = newBlue;
    }
  });

  return image;
};
