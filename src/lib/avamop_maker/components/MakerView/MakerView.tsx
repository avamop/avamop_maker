import React, { useContext, useEffect, useRef, useState } from "react";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerLayerCombineParts } from "../functions/imageProcess/MakerLayerCombineParts";
import { MakerConvertBase64 } from "../functions/imageProcess/MakerConvertBase64";
import SelectedPartsContext from "../../store/SelectedPartsContext";
import PartsObjectJimpContext from "../../store/PartsObjectJimpContext";
import ViewScaleContext from "../../store/ViewScaleContext";
import SelectedPartsForCanvasContext from "../../store/SelectedPartsForCanvasContext";

const MakerView: React.FC = ({}) => {
  const { selectedPartsForCanvas, setSelectedPartsForCanvas } = useContext(
    SelectedPartsForCanvasContext
  );
  const [canvasImage, setCanvasImage] = useState<string[] | null>(null);
  const viewScale = useContext(ViewScaleContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const imageGen = async () => {
      const tmpCanvasImage: string[] = await MakerLayerCombineParts(
        selectedPartsForCanvas
      );
      setCanvasImage(tmpCanvasImage);
    };
    imageGen();
  }, [selectedPartsForCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // キャンバスをクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 画像をレイヤーとして追加
    if (canvasImage) {
      // すべての画像が読み込まれるのを待つ
      Promise.all(
        canvasImage.map((image) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = image;
            img.onload = () => {
              resolve({ img, image });
            };
          });
        })
      ).then((images: any[]) => {
        // キャンバスのサイズを設定
        const firstImage = images[0].img;
        canvas.width = firstImage.width * viewScale;
        canvas.height = firstImage.height * viewScale;

        // 画像をレイヤーとして追加
        images.forEach(({ img }) => {
          context.globalCompositeOperation = "source-over";
          context.imageSmoothingEnabled = false;
          context.drawImage(
            img,
            0,
            0,
            img.width * viewScale,
            img.height * viewScale
          );
        });
      });
    }
  }, [canvasImage, viewScale]);

  return (
    <>
      <canvas ref={canvasRef}></canvas> {/*アバター画像を表示する場所*/}
    </>
  );
};

export default MakerView;
