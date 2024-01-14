import Jimp from "jimp/browser/lib/jimp";
import { JimpObject, JimpType } from "../../../types/jimp";

export const MakerPartsColoring = async (
  image: JimpType,
  partSplit: string,
  colorGroup: string,
  selectedParts: SelectedParts,
  colorsObject: ColorsObject
): Promise<JimpType> => {
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
    const hCalculatedTmp = colorData.hueShiftReverse
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
      colorData.saturationGraph.globalSlope * i +
      colorData.saturationGraph.individualSlope[i];
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
  image: JimpType,
  oldColors: string[],
  newColors: string[]
): Promise<JimpType> => {
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
