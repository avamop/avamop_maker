import React, { useEffect, useRef, useState } from "react";
import "../../module-css/makerView/MakerView.module.css"; // CSSファイルをインポート
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerCanvasSelectedPartsGen } from "../functions/fetchData/MakerCanvasSelectedPartsGen";
import { MakerLayerCombineParts } from "../functions/imageProcess/MakerLayerCombineParts";
import { MakerConvertBase64 } from "../functions/imageProcess/MakerConvertBase64";

interface MakerViewProps {
  SelectedParts: SelectedParts;
  PartsObjectJimp: PartsObjectJimp;
  selectedFace: string;
  scale: number;
}

const MakerView: React.FC<MakerViewProps> = ({
  SelectedParts,
  PartsObjectJimp,
  selectedFace,
  scale,
}) => {
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const imageGen = async () => {
      const selectedPartsForCanvas: SelectedPartsForCanvas =
        MakerCanvasSelectedPartsGen(
          SelectedParts,
          PartsObjectJimp,
          selectedFace
        );

      const tmpCanvasImage: Jimp = await MakerLayerCombineParts(
        selectedPartsForCanvas
      );

      setCanvasImage(await MakerConvertBase64(tmpCanvasImage));
    };
    imageGen();
  }, [SelectedParts, selectedFace]);

  useEffect(() => {
    if (canvasImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
        };
        img.src = canvasImage;
      }
    }
  }, [canvasImage]);
  return (
    <>
      <canvas ref={canvasRef}></canvas> {/*アバター画像を表示する場所*/}
    </>
  );
};

export default MakerView;
