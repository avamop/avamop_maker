import Jimp from "jimp";
import { JimpServer } from "../../../types/jimpServer";
interface PartsObjectJimpServer {
  [category: "body" | string]: {
    partCount: number;
    partChain: string;
    ignoreTrigger: null | string[];
    partList: CategoryJimpServer;
  };
}

interface CategoryJimpServer {
  [partSplit: "body" | string]: {
    colorGroup: null | string;
    partOrder: number;
    items: ItemsJimpServer;
  };
}
interface ItemsJimpServer {
  [item: string]: {
    bodyType: string[];
    enableColor: boolean;
    faces: FacesJimpServer;
  };
}

interface FacesJimpServer {
  [face: "clear" | string]: {
    jimpData: JimpServer;
  };
}

const MakerGenerateAvaterImage = async (
  partsPath: string,
  nullImagePath: string,
  partsObject: PartsObjectSplit,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject
): Promise<string> => {
  const nullImage: JimpServer = await Jimp.read(partsPath + nullImagePath);
  const partsObjectJimp: PartsObjectJimpServer = await MakerConvertPartsJimp(
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
  const canvasImage: JimpServer[] = await MakerLayerCombineParts(
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

const MAX_PROMISE = 20;

// パスの入ったpartsObjectをJimpデータの入ったものに変換する
export const MakerConvertPartsJimp = async (
  partsObject: PartsObjectSplit,
  partsPath: string,
  nullImage: JimpServer,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject
): Promise<PartsObjectJimpServer> => {
  const partsObjectJimp: PartsObjectJimpServer = {};
  for (const category in selectedParts.category) {
    partsObjectJimp[category] = {
      partCount: partsObject[category].partCount,
      partChain: partsObject[category].partChain,
      ignoreTrigger: partsObject[category].ignoreTrigger,
      partList: {},
    };
    for (const partSplit in partsObject[category.replace(/_\d+$/, "")]
      .partList) {
      partsObjectJimp[category].partList[partSplit] = {
        colorGroup:
          partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
            .colorGroup,
        partOrder:
          partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
            .partOrder,
        items: {},
      };
      for (const item in partsObject[category.replace(/_\d+$/, "")].partList[
        partSplit
      ].items) {
        partsObjectJimp[category].partList[partSplit].items[item] = {
          bodyType:
            partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[item].bodyType,
          enableColor:
            partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[item].enableColor,
          faces: {},
        };

        await asyncMap(
          Object.keys(
            partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
              .items[item].faces
          ),
          async (face) => {
            let jimpData: JimpServer;

            if (
              partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
                .items[item].faces[face].imagePath == ""
            ) {
              jimpData = nullImage;
            } else {
              jimpData = await partRead(
                partsPath +
                  partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
                    .items[item].faces[face].imagePath,
                partsObject[category.replace(/_\d+$/, "")].partList[partSplit]
                  .colorGroup,
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
          }
        );
      }
    }
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
): Promise<JimpServer> => {
  try {
    const image: JimpServer = await Jimp.read(imagePath);
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

const asyncMap = async (
  array,
  mapper,
  concurrency = MAX_PROMISE
): Promise<FacesJimpServer[]> => {
  const queue = array.slice();
  const results = new Array(array.length);
  const workers = new Array(concurrency).fill(Promise.resolve());

  const pushTask = (i) => {
    if (queue.length) {
      const item = queue.shift();
      return mapper(item).then((result) => {
        results[i] = result;
        return pushTask(i);
      });
    }
  };

  await Promise.all(workers.map(pushTask));

  return results;
};

export const MakerPartsColoring = async (
  image: JimpServer,
  partSplit: string,
  colorGroup: string,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject
): Promise<JimpServer> => {
  // console.log("colord!");
  const maskColor: string[] = [
    "#fefefe",
    "#e5e5e5",
    "#cbcbcb",
    "#b2b2b2",
    "#989898",
    "#7f7f7f",
    "#656565",
    "#4c4c4c",
    "#323232",
    "#191919",
  ];
  const colorData = selectedParts.selectedColor[colorGroup]
    ? selectedParts.selectedColor[colorGroup][partSplit]
      ? selectedParts.selectedColor[colorGroup][partSplit]
      : selectedParts.selectedColor[colorGroup]["default"]
    : selectedParts.selectedColor["none"]["default"];
  const colorCode: string = colorsObject[colorData.color].hex;
  const colorHsv: [number, number, number] = rgbToHsv(colorCode);
  let changeColor: string[] = [];
  for (let i = 0; i < 10; i++) {
    const hCalculatedTmp = colorData.hueReverse
      ? colorHsv[0] -
        (colorData.hueGraph.globalSlope * i +
          colorData.hueGraph.individualSlope[i])
      : colorHsv[0] +
        (colorData.hueGraph.globalSlope * i +
          colorData.hueGraph.individualSlope[i]);
    const sCalculatedTmp = colorData.saturationReverse
      ? colorHsv[1] +
        (colorData.saturationGraph.globalSlope * i +
          colorData.saturationGraph.individualSlope[i])
      : colorHsv[1] -
        (colorData.saturationGraph.globalSlope * i +
          colorData.saturationGraph.individualSlope[i]);
    const vCalculatedTmp =
      colorHsv[2] -
      colorData.valueGraph.globalSlope * i +
      colorData.valueGraph.individualSlope[i];
    const hCalculated =
      hCalculatedTmp < 0
        ? hCalculatedTmp < -360
          ? hCalculatedTmp * (hCalculatedTmp / -360) + hCalculatedTmp
          : 360 + hCalculatedTmp
        : hCalculatedTmp > 360
        ? hCalculatedTmp > 720
          ? hCalculatedTmp * (hCalculatedTmp / 360) - hCalculatedTmp
          : hCalculatedTmp - 360
        : hCalculatedTmp;
    const sCalculated =
      sCalculatedTmp < 0 ? 0 : sCalculatedTmp > 255 ? 255 : sCalculatedTmp;
    const vCaluculated =
      vCalculatedTmp < 0 ? 0 : vCalculatedTmp > 255 ? 255 : vCalculatedTmp;
    // console.log(hCalculated, sCalculated, vCaluculated);
    changeColor.push(hsvToRgb([hCalculated, sCalculated, vCaluculated]));
  }
  // console.log(maskColor);
  // console.log(changeColor);
  return await MakerPartsColoringChange(image, maskColor, changeColor);
};

const MakerPartsColoringChange = async (
  image: JimpServer,
  oldColors: string[],
  newColors: string[]
): Promise<JimpServer> => {
  try {
    const colorPairs = oldColors.map((oldColor, i) => {
      const oldRGB: { red: number; green: number; blue: number } =
        hexToRgb(oldColor);
      // console.log(oldColor, oldRGB);
      const newRGB: { red: number; green: number; blue: number } = hexToRgb(
        newColors[i]
      );
      return {
        old: oldRGB,
        new: newRGB,
      };
    });

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const alpha: number = image.bitmap.data[idx + 3];
      if (alpha === 0) {
        //透明ピクセルの場合、処理をスキップする
        return;
      }

      const red: number = image.bitmap.data[idx + 0];
      const green: number = image.bitmap.data[idx + 1];
      const blue: number = image.bitmap.data[idx + 2];

      for (const { old, new: newColor } of colorPairs) {
        if (red === old.red && green === old.green && blue === old.blue) {
          image.bitmap.data[idx + 0] = newColor.red;
          image.bitmap.data[idx + 1] = newColor.green;
          image.bitmap.data[idx + 2] = newColor.blue;
          break;
        }
      }
    });

    return image;
  } catch (error) {
    console.error("画像着色エラー：", error);
    throw error; // エラーを再スローして、呼び出し元で処理できるようにします
  }
};

const hexToRgb = (
  hex: string
): { red: number; green: number; blue: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null;
};

// カラーコードをHSVに変換する関数
const rgbToHsv = (hex: string): [number, number, number] => {
  // console.log(hex);
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 359), Math.round(s * 255), Math.round(v * 255)];
};

// HSVをカラーコードに変換する関数
function hsvToRgb(hsv: [number, number, number]): string {
  let [h, s, v] = hsv;
  s /= 255;
  v /= 255;

  let r = 0,
    g = 0,
    b = 0;

  let i = Math.floor(h / 60);
  let f = h / 60 - i;
  let p = v * (1 - s);
  let q = v * (1 - s * f);
  let t = v * (1 - s * (1 - f));

  switch (i % 6) {
    case 0:
      [r, g, b] = [v, t, p];
      break;
    case 1:
      [r, g, b] = [q, v, p];
      break;
    case 2:
      [r, g, b] = [p, v, t];
      break;
    case 3:
      [r, g, b] = [p, q, v];
      break;
    case 4:
      [r, g, b] = [t, p, v];
      break;
    case 5:
      [r, g, b] = [v, p, q];
      break;
  }

  let hex = (x: number) => {
    let hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + hex(r) + hex(g) + hex(b);
}

export const MakerLayerCombineParts = async (
  selectedPartsForCanvas: SelectedPartsForCanvas
): Promise<Jimp[]> => {
  type Orders = {
    category: string;
    partSplit: string;
    partOrder: number;
    partData: JimpServer;
  };
  // console.log(selectedPartsForCanvas);
  let sortedParts: Orders[] = [];
  for (const category in selectedPartsForCanvas.category) {
    for (const partSplit in selectedPartsForCanvas.category[category]
      .partSplit) {
      sortedParts.push({
        category: category,
        partSplit: partSplit,
        partOrder:
          selectedPartsForCanvas.category[category].partSplit[partSplit]
            .partOrder,
        partData:
          selectedPartsForCanvas.category[category].partSplit[partSplit]
            .partData,
      });
    }
  }
  sortedParts.sort((a, b) => {
    // partOrderが一致していない場合、partOrderでソート
    return a.partOrder - b.partOrder;
  });
  // console.log(sortedParts);
  // 最初の画像をベースにする

  const imageArray: JimpServer[] = [];

  // 残りの画像を合成
  for (let i = 0; i < sortedParts.length; i++) {
    imageArray.push(sortedParts[i].partData);
  }
  return imageArray;
};

export const MakerCanvasSelectedPartsGen = (
  selectedParts: SelectedParts,
  partsObjectJimp: PartsObjectJimpServer,
  nullImage: JimpServer
): SelectedPartsForCanvas => {
  const selectedPartsForCanvas: SelectedPartsForCanvas = {
    bodyType: selectedParts.bodyType,
    face: selectedParts.face,
    category: {},
    selectedColor: selectedParts.selectedColor,
    selectedFace: selectedParts.selectedFace,
  };
  const tmpSelectedPartsForCanvas: SelectedPartsForCanvasCategory = {};

  for (const tmpCategory in selectedParts.category) {
    let selectedPartsForCanvasSplit: SelectedPartsForCanvasSplit = {};
    for (const partSplit in partsObjectJimp[tmpCategory].partList) {
      selectedPartsForCanvasSplit[partSplit] = {
        enableColor:
          selectedParts.category[tmpCategory].partName != ""
            ? partsObjectJimp[tmpCategory].partList[partSplit].items[
                selectedParts.category[tmpCategory].partName
              ].enableColor
            : false,
        colorGroup: partsObjectJimp[tmpCategory].partList[partSplit].colorGroup,
        partOrder: partsObjectJimp[tmpCategory].partList[partSplit].partOrder,
        partData:
          selectedParts.category[tmpCategory].partName != ""
            ? partsObjectJimp[tmpCategory].partList[partSplit].items[
                selectedParts.category[tmpCategory].partName
              ].faces[selectedParts.selectedFace[tmpCategory]]
              ? partsObjectJimp[tmpCategory].partList[partSplit].items[
                  selectedParts.category[tmpCategory].partName
                ].faces[selectedParts.selectedFace[tmpCategory]].jimpData
              : partsObjectJimp[tmpCategory].partList[partSplit].items[
                  selectedParts.category[tmpCategory].partName
                ].faces["clear"].jimpData
            : nullImage,
      };
    }
    tmpSelectedPartsForCanvas[tmpCategory] = {
      partSplit: selectedPartsForCanvasSplit,
      partFlip: selectedParts.category[tmpCategory].partFlip,
    };
  }
  // console.log(tmpSelectedPartsForCanvas);
  selectedPartsForCanvas.category = selectedPartsForCanvasSort(
    tmpSelectedPartsForCanvas
  );
  return selectedPartsForCanvas;
};

//パーツの順番を定め、カテゴリーの連番に伴って重複したパーツの順番値の分だけ加算する
const selectedPartsForCanvasSort = (
  selectedPartsForCanvasCategory: SelectedPartsForCanvasCategory
): SelectedPartsForCanvasCategory => {
  type Orders = { category: string; partSplit: string; partOrder: number };

  let partOrders: Orders[] = [];
  for (const category in selectedPartsForCanvasCategory) {
    for (const partSplit in selectedPartsForCanvasCategory[category]
      .partSplit) {
      partOrders.push({
        category: category,
        partSplit: partSplit,
        partOrder:
          selectedPartsForCanvasCategory[category].partSplit[partSplit]
            .partOrder,
      });
    }
  }
  partOrders.sort((a, b) => {
    // partOrderが一致している場合、カテゴリ名に含まれる連番でソート
    if (a.partOrder === b.partOrder) {
      const numA = Number(
        a.category.match(/_(\d+)$/) ? a.category.match(/_(\d+)$/)[1] : 0
      );
      const numB = Number(
        b.category.match(/_(\d+)$/) ? b.category.match(/_(\d+)$/)[1] : 0
      );
      return numA - numB;
    }
    // partOrderが一致していない場合、partOrderでソート
    return a.partOrder - b.partOrder;
  });

  let increment: number = 0;
  let lastIncrement: number = 0;
  let splitIncrement: number = 0;
  let lastCategory: string = null;
  // 同じpartOrderがある場合に重複分だけ後の部分を加算
  for (let i = 0; i < partOrders.length; i++) {
    let category: string = partOrders[i].category.split("_")[0];
    let partOrder: number = partOrders[i].partOrder;

    if (lastCategory && category === lastCategory) {
      increment++;
    } else if (lastCategory && category !== lastCategory) {
      lastIncrement = lastIncrement + increment;
      increment = 0;
    }

    partOrders[i].partOrder =
      partOrder + splitIncrement + lastIncrement + increment;
    lastCategory = category;
  }

  let result: SelectedPartsForCanvasCategory = {};
  for (let i = 0; i < partOrders.length; i++) {
    let category = partOrders[i].category;
    let partSplit = partOrders[i].partSplit;
    if (!result[category]) {
      result[category] = {
        partSplit: {},
        partFlip: selectedPartsForCanvasCategory[category].partFlip,
      };
    }

    result[category].partSplit[partSplit] = {
      enableColor:
        selectedPartsForCanvasCategory[category].partSplit[partSplit]
          .enableColor,
      colorGroup:
        selectedPartsForCanvasCategory[category].partSplit[partSplit]
          .colorGroup,
      partOrder: partOrders[i].partOrder,
      partData:
        selectedPartsForCanvasCategory[category].partSplit[partSplit].partData,
    };
  }
  return result;
};
