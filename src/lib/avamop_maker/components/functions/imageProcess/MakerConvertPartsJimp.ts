import Jimp from "jimp/browser/lib/jimp";
import { JimpObject, JimpType } from "../../../types/jimp";
import { MakerPartsColoring } from "./MakerPartsColoring";

declare const Jimp: JimpObject;

// パスの入ったpartsObjectをJimpデータの入ったものに変換する
export const MakerConvertPartsJimp = async (
  partsObject: PartsObjectSplit,
  partsPath: string,
  nullImage: JimpType,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject
): Promise<PartsObjectJimp> => {
  const partsObjectJimp: PartsObjectJimp = {};
  const promises = [];
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
          promises.push(
            (async () => {
              let jimpData: JimpType;
              try {
                if (
                  partsObject[category].partList[partSplit].items[item].faces[
                    face
                  ].imagePath == ""
                ) {
                  jimpData = nullImage;
                } else {
                  jimpData = await partRead(
                    partsPath +
                      partsObject[category].partList[partSplit].items[item]
                        .faces[face].imagePath,
                    partsObject[category].partList[partSplit].colorGroup,
                    selectedParts,
                    colorsObject,
                    partSplit
                  );
                  //パーツのパスからJimpデータを生成する
                }
                partsObjectJimp[category].partList[partSplit].items[item].faces[
                  face
                ] = {
                  jimpData: jimpData,
                };
              } catch (error) {
                console.log("パーツ読み込みエラー：" + error);
              }
            })()
          );
        }
      }
    }
  }
  if (promises.length >= 12) {
    await Promise.all(promises);
    promises.length = 0;
  }
  return partsObjectJimp;
};

//パーツ画像を読み込んで返す関数
const partRead = async (
  imagePath: string,
  colorGroup: string,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject,
  partIndividual: string
): Promise<JimpType> => {
  try {
    const image: JimpType = await Jimp.read(imagePath);
    return await MakerPartsColoring(
      image,
      partIndividual,
      colorGroup,
      selectedParts,
      colorsObject
    );
  } catch (error) {
    console.log("パーツ画像が見つかりません:" + error);
    return;
  }
};
