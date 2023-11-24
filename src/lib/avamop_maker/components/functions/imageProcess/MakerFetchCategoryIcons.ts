import { MakerConvertBase64 } from "./MakerConvertBase64";
import { MakerPartsIconTrim } from "./MakerPartsIconTrim";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

export const MakerFetchCategoryIcons = async (
  ThumbnailObject: MenuThumbnail,
  path: string
): Promise<MenuThumbnail> => {
  for (const category in ThumbnailObject) {
    const image: Jimp = await Jimp.read(
      path + ThumbnailObject[category].pathUrl
    );
    ThumbnailObject[category].pathUrl = await MakerConvertBase64(
      await MakerPartsIconTrim(await image)
    );
  }
  return ThumbnailObject;
};
