import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

// パスの入ったPartsObjectをJimpデータの入ったものに変換する
export const MakerConvertPartsJimp = async (
  PartsObject: PartsObjectSplit,
  path: string
): Promise<PartsObjectJimp> => {
  const PartsObjectJimp: PartsObjectJimp = {};
  for (const category in PartsObject) {
    PartsObjectJimp[category] = {
      partCount: PartsObject[category].partCount,
      partChain: PartsObject[category].partChain,
      ignoreTrigger: PartsObject[category].ignoreTrigger,
      partList: {},
    };
    for (const partSplit in PartsObject[category].partList) {
      PartsObjectJimp[category].partList[partSplit] = {
        colorGroup: PartsObject[category].partList[partSplit].colorGroup,
        partOrder: PartsObject[category].partList[partSplit].partOrder,
        items: {},
      };
      for (const item in PartsObject[category].partList[partSplit].items) {
        PartsObjectJimp[category].partList[partSplit].items[item] = {
          bodyType:
            PartsObject[category].partList[partSplit].items[item].bodyType,
          color: PartsObject[category].partList[partSplit].items[item].color,
          faces: {},
        };
        for (const face in PartsObject[category].partList[partSplit].items[item]
          .faces) {
          try {
            const jimpData = await partRead(
              path +
                PartsObject[category].partList[partSplit].items[item].faces[
                  face
                ].imagePath
            ); //パーツのパスからJimpデータを生成する
            PartsObjectJimp[category].partList[partSplit].items[item].faces[
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
  return PartsObjectJimp;
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
