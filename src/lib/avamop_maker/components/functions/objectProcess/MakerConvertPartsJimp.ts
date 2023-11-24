import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

// パスの入ったpartObjectをJimpデータの入ったものに変換する
export const MakerConvertPartsJimp = async (
  partObject: PartObjectMerged,
  path: string
): Promise<PartObjectJimp> => {
  const PartObjectJimp: PartObjectJimp = {};
  for (const category in partObject) {
    PartObjectJimp[category] = {
      colorGroup: partObject[category].colorGroup,
      partCount: partObject[category].partCount,
      partChain: partObject[category].partChain,
      ignoreTrigger: partObject[category].ignoreTrigger,
      partList: {},
    };
    for (const partSplit in partObject[category].partList) {
      PartObjectJimp[category].partList[partSplit] = {
        partOrder: partObject[category].partList[partSplit].partOrder,
        items: {},
      };
      for (const item in partObject[category].partList[partSplit].items) {
        PartObjectJimp[category].partList[partSplit].items[item] = {
          bodyType:
            partObject[category].partList[partSplit].items[item].bodyType,
          color: partObject[category].partList[partSplit].items[item].color,
          faces: {},
        };
        for (const face in partObject[category].partList[partSplit].items[item]
          .faces) {
          try {
            const jimpData = await partRead(
              path +
                partObject[category].partList[partSplit].items[item].faces[face]
                  .facePath
            ); //パーツのパスからJimpデータを生成する
            PartObjectJimp[category].partList[partSplit].items[item].faces[
              face
            ] = {
              jimpData: jimpData,
            };
          } catch (error) {
            console.log("パーツ読み込みエラー：" + error);
          }
        }
      }
    }
  }
  return PartObjectJimp;
};

//パーツ画像を読み込んで返す関数
const partRead = async (imagePath: string): Promise<Jimp> => {
  try {
    const image: Jimp = await Jimp.read(imagePath);
    return image;
  } catch (error) {
    console.log("パーツ画像が見つかりません:" + error);
    return;
  }
};
