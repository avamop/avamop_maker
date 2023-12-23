import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

export const MakerPartsColoring = async (
  selectedParts: SelectedPartsForCanvas,
  colorGroup: string,
  category: string,
  partSplit: string,
  colorsObject: ColorsObject
): Promise<Jimp> => {
  const maskColor: string[] = [
    "fefefe",
    "e5e5e5",
    "cbcbcb",
    "b2b2b2",
    "989898",
    "7f7f7f",
    "656565",
    "4c4c4c",
    "323232",
    "191919",
  ];
  const colorData = selectedParts.selectedColor[colorGroup]["default"];
  const colorCode: string = colorsObject[colorData.color];
  const colorHsv: [number, number, number] = rgbToHsv(colorCode);
  let changeColor: string[] = [];
  for (let i = 0; i < 10; i++) {
    const hCalculatedTmp = colorData.hueShiftReverse
      ? colorHsv[0] -
        (colorData.hueGraph.globalSlope + colorData.hueGraph.individualSlope[i])
      : colorHsv[0] +
        (colorData.hueGraph.globalSlope +
          colorData.hueGraph.individualSlope[i]);
    const sCalculatedTmp = colorData.saturationReverse
      ? colorHsv[1] +
        (colorData.saturationGraph.globalSlope +
          colorData.saturationGraph.individualSlope[i])
      : colorHsv[1] -
        (colorData.saturationGraph.globalSlope +
          colorData.saturationGraph.individualSlope[i]);
    const vCalculatedTmp =
      colorHsv[2] -
      colorData.saturationGraph.globalSlope +
      colorData.saturationGraph.individualSlope[i];
    const hCalculated =
      hCalculatedTmp < 0
        ? 360 + hCalculatedTmp
        : hCalculatedTmp > 360
        ? hCalculatedTmp - 360
        : hCalculatedTmp;
    const sCalculated =
      sCalculatedTmp < 0 ? 0 : sCalculatedTmp > 255 ? 255 : sCalculatedTmp;
    const vCaluculated =
      vCalculatedTmp < 0 ? 0 : vCalculatedTmp > 255 ? 255 : vCalculatedTmp;
    changeColor.push(hsvToRgb(hCalculated, sCalculated, vCaluculated));
  }
  return MakerPartsColoringChange(
    selectedParts.category[category].partSplit[partSplit].partData,
    maskColor,
    changeColor
  );
};

// カラーコードをHSVに変換する関数
const rgbToHsv = (hex: string): [number, number, number] => {
  console.log(hex);
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
const hsvToRgb = (h: number, s: number, v: number): string => {
  let r, g, b;
  let i = Math.floor(h / 60);
  let f = h / 60 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  let hr = Math.floor(r * 255).toString(16);
  let hg = Math.floor(g * 255).toString(16);
  let hb = Math.floor(b * 255).toString(16);

  return (
    "#" +
    (hr.length < 2 ? "0" : "") +
    hr +
    (hg.length < 2 ? "0" : "") +
    hg +
    (hb.length < 2 ? "0" : "") +
    hb
  );
};

const MakerPartsColoringChange = async (
  image: Jimp,
  oldColors: string[],
  newColors: string[]
): Promise<Jimp> => {
  const colorPairs = oldColors.map((oldColor, i) => {
    const oldRGB: number = Jimp.cssColorToHex(oldColor);
    const newRGB: number = Jimp.cssColorToHex(newColors[i]);

    return {
      old: {
        red: (oldRGB >> 16) & 255,
        green: (oldRGB >> 8) & 255,
        blue: oldRGB & 255,
      },
      new: {
        red: (newRGB >> 16) & 255,
        green: (newRGB >> 8) & 255,
        blue: newRGB & 255,
      },
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
};
