import { MakerConvertBase64 } from "./MakerConvertBase64";
import { MakerPartIconsTrim } from "./MakerPartIconsTrim";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

export const MakerFetchCategoryIcons = async (
  categoryIconObject: categoryIconObject,
  path: string
): Promise<categoryIconObject> => {
  for (const category in categoryIconObject) {
    const image: Jimp = await Jimp.read(
      path + categoryIconObject[category].imagePath
    );
    categoryIconObject[category].imagePath = await MakerConvertBase64(
      await MakerPartIconsTrim(await image)
    );
  }
  return categoryIconObject;
};
