import React, { useContext, useState } from "react";
import * as styles from "../module-css/makerView/MakerWindow.module.css"; // CSSファイルをインポート
import MakerView from "./MakerView/MakerView";
import MakerPartsMenu from "./makerMenu/MakerPartsMenu";
import MakerColorsMenu from "./makerMenu/MakerColorsMenu";
import CanvasImageContext from "../store/CanvasImageContext";
import "jimp/browser/lib/jimp";
import { JimpObject } from "../types/jimp";
import SelectedPartsContext from "../store/SelectedPartsContext";

declare const Jimp: JimpObject;

const MakerWindow: React.FC = () => {
  const { selectedParts } = useContext(SelectedPartsContext);
  const { canvasImage } = useContext(CanvasImageContext);
  const [imageNumber, setImageNumber] = useState(0);

  const saveImage = async (images) => {
    // const event = new CustomEvent("avamopSave", { detail: selectedParts });
    // window.dispatchEvent(event);
    let combinedImage = images[0];
    for (let i = 1; i < images.length; i++) {
      combinedImage = combinedImage.composite(images[i], 0, 0);
    }
    const data = await combinedImage.getBase64Async(Jimp.MIME_PNG);
    const link = document.createElement("a");
    link.href = data;
    const event = new CustomEvent("avamopSave", { detail: data });
    window.dispatchEvent(event);
    // link.download = `avatar_${imageNumber}.png`;
    // link.click();
    setImageNumber(imageNumber + 1);
  };

  const handleClick = () => {
    saveImage(canvasImage);
  };

  return (
    <>
      <div className={styles["allObjectContainer"]}>
        {/* アバターメーカーのアバター表示部分 */}
        <div className={styles["avatarImgAll"]}>
          <MakerView />
          {/* オブジェクト変化テスト用ボタン */}
          <button
            id="avamopSave"
            className={styles["bottomButton"]}
            onClick={handleClick}
          >
            完成
          </button>
        </div>
        <div className={styles["optionMenuGroup"]}>
          {/* アバターメーカーの表情メニュー部分 */}
          {/* <MakerFaceMenu /> */}
          {/* アバターメーカーのパーツメニュー部分 */}
          <div className={styles["avatarImgPart"]}>
            <MakerPartsMenu />
          </div>
          {/* アバターメーカーの色メニュー部分 */}
          <MakerColorsMenu />
        </div>
      </div>
    </>
  );
};

export default React.memo(MakerWindow);
