import { MakerConvertPartsJimp } from "../imageProcess/MakerConvertPartsJimp";
import { MakerCanvasSelectedPartsGen } from "./MakerCanvasSelectedPartsGen";
import Jimp from "jimp";
import { MakerLayerCombineParts } from "../imageProcess/MakerLayerCombineParts";

const MakerGenerateAvaterImage = async (
  partsPath: string,
  nullImagePath: string,
  partsObject: PartsObjectSplit,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject
): Promise<string> => {
  const nullImage: Jimp = await Jimp.read(partsPath + nullImagePath);
  const partsObjectJimp: PartsObjectJimp = await MakerConvertPartsJimp(
    partsObject,
    partsPath,
    nullImage,
    selectedParts,
    colorsObject
  );
  const selectedPartsForCanvas: SelectedPartsForCanvas =
    await MakerCanvasSelectedPartsGen(
      selectedParts,
      partsObjectJimp,
      nullImage
    );
  const canvasImage: Jimp[] = await MakerLayerCombineParts(
    selectedPartsForCanvas
  );
  let combinedImage = canvasImage[0];
  for (let i = 1; i < canvasImage.length; i++) {
    combinedImage = combinedImage.composite(canvasImage[i], 0, 0);
  }
  const avaterImage = await combinedImage.getBase64Async(Jimp.MIME_PNG);
  return await avaterImage;
};

export default MakerGenerateAvaterImage;
