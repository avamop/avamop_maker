import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

export const MakerPartIconsTrim = async (image: Jimp, iconSize: number) => {
  let top: number, left: number, bottom: number, right: number;

  if (image.bitmap.width == iconSize && image.bitmap.height == iconSize) {
    return image;
  }

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const alpha = image.bitmap.data[idx + 3];
    if (alpha !== 0) {
      top = Math.min(y, top || y);
      left = Math.min(x, left || x);
      bottom = Math.max(y, bottom || y);
      right = Math.max(x, right || x);
    }
  });

  const width = right - left;
  const height = bottom - top;
  const size = Math.max(width, height) + 4;

  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;

  const trimLeft = Math.max(0, centerX - size / 2);
  const trimTop = Math.max(0, centerY - size / 2);

  const trimmedImage = image.clone().crop(trimLeft, trimTop, size, size);
  trimmedImage.resize(
    iconSize,
    iconSize,
    size >= iconSize / 2 ? Jimp.RESIZE_BILINEAR : Jimp.RESIZE_NEAREST_NEIGHBOR
  );

  return await trimmedImage;
};
