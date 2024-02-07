import React, { useContext, useEffect, useRef } from "react";
import "jimp/browser/lib/jimp";
import { JimpObject } from "../../types/jimp";
import { MakerConvertBase64 } from "../functions/imageProcess/MakerConvertBase64";
import ViewScaleContext from "../../store/ViewScaleContext";
import * as styles from "../../module-css/makerView/MakerView.module.css";
import CanvasImageContext from "../../store/CanvasImageContext";

declare const Jimp: JimpObject;

const MakerView: React.FC = ({}) => {
  const { canvasImage } = useContext(CanvasImageContext);
  const viewScale = useContext(ViewScaleContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasGen = async () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // 画像をレイヤーとして追加
      if (canvasImage) {
        // すべての画像が読み込まれるのを待つ
        Promise.all(
          canvasImage.map((image) => {
            return new Promise(async (resolve) => {
              const img = new Image();
              img.style.imageRendering = "pixelated";
              img.src = await MakerConvertBase64(image);
              img.onload = () => {
                resolve({ img, image });
              };
            });
          })
        ).then((images: any[]) => {
          // キャンバスをクリア
          context.clearRect(0, 0, canvas.width, canvas.height);

          // キャンバスのサイズを設定
          const firstImage = images[0].img;
          canvas.width = firstImage.width * viewScale;
          canvas.height = firstImage.height * viewScale;

          // 画像をレイヤーとして追加
          images.forEach(({ img }) => {
            context.globalCompositeOperation = "source-over";
            context.imageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false;
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
    };
    canvasGen();
  }, [canvasImage, viewScale]);

  return (
    <>
      <canvas ref={canvasRef} className={styles["Canvas"]}></canvas>{" "}
      {/*アバター画像を表示する場所*/}
    </>
  );
};

export default MakerView;
