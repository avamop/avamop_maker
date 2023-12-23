import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

// パスの入ったpartsObjectをJimpデータの入ったものに変換する
export const MakerConvertPartsJimp = async (
  partsObject: PartsObjectSplit,
  path: string,
  nullImage: Jimp
): Promise<PartsObjectJimp> => {
  const partsObjectJimp: PartsObjectJimp = {};
  for (const category in partsObject) {
    partsObjectJimp[category] = {
      partCount: partsObject[category].partCount,
      partChain: partsObject[category].partChain,
      ignoreTrigger: partsObject[category].ignoreTrigger,
      partList: {},
    };
    for (const partSplit in partsObject[category].partList) {
      partsObjectJimp[category].partList[partSplit] = {
        colorGroup: partsObject[category].partList[partSplit].colorGroup,
        partOrder: partsObject[category].partList[partSplit].partOrder,
        items: {},
      };
      for (const item in partsObject[category].partList[partSplit].items) {
        partsObjectJimp[category].partList[partSplit].items[item] = {
          bodyType:
            partsObject[category].partList[partSplit].items[item].bodyType,
          enableColor:
            partsObject[category].partList[partSplit].items[item].enableColor,
          faces: {},
        };
        for (const face in partsObject[category].partList[partSplit].items[item]
          .faces) {
          let jimpData: Jimp;
          try {
            if (
              partsObject[category].partList[partSplit].items[item].faces[face]
                .imagePath == ""
            ) {
              jimpData = nullImage;
            } else {
              jimpData = await partRead(
                path +
                  partsObject[category].partList[partSplit].items[item].faces[
                    face
                  ].imagePath
              ); //パーツのパスからJimpデータを生成する
            }
            partsObjectJimp[category].partList[partSplit].items[item].faces[
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
  return partsObjectJimp;
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
