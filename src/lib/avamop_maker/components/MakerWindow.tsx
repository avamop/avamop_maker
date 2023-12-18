import React, { useState, useEffect } from "react";
import styles from "../module-css/makerView/MakerWindow.module.css"; // CSSファイルをインポート

import MakerView from "./MakerView/MakerView";
import MakerPartsMenu from "./makerMenu/MakerPartsMenu";
import MakerFaceMenu from "./makerMenu/MakerFaceListMenu";
import MakerColorsMenu from "./makerMenu/MakerColorsMenu";

const MakerWindow: React.FC = ({}) => {
  let imageNumber = 0;
  const [canvasImage, setCanvasImage] = useState(null);
  const saveImage = (data: string) => {
    const link = document.createElement("a");
    link.href = data;
    link.download = `avatar_${imageNumber}.png`; // ファイル名に連番を追加
    link.click();
    imageNumber++; // 画像を保存した後で連番を増加
  };
  
  const handleClick = () => {
    saveImage(canvasImage);
  };

  return (
  
     <>
        <div className={styles['all-object-container']}>
          {/* アバターメーカーのアバター表示部分 */}
          <div className={styles['avatar-img-all']}>
            <MakerView
            canvasImage={canvasImage}
            setCanvasImage={setCanvasImage}
            selectedParts={selectedParts}
            partsObjectJimp={partsObjectJimp}
            selectedFace={selectedFace}
            scale={2}
          />
          {/* オブジェクト変化テスト用ボタン */}
              <button className={styles["bottom-button"]} onClick = { handleClick }>完成</button>
          </div>
          <div className={styles["option-menu-group"]}>

          {/* アバターメーカーの表情メニュー部分 */}
          {/* <MakerFaceMenu
            
          /> */}
          {/* アバターメーカーの色メニュー部分 */}
        <MakerColorsMenu/>
          {/* アバターメーカーのパーツメニュー部分 */}
          <div className={styles['avatar-img-part']}>
          <MakerPartsMenu
            isLoading={isLoading}
            categoryIconObject={categoryIcon}
            selectedCategory={selectedCategory}
            selectedFace={selectedFace}
            handleCategoryClick={handleCategoryClick}
            menuPartIcons={menuPartIcons}
            selectedParts={selectedParts}
            setSelectedParts={setSelectedParts}
          />
          </div>
        </div>
        </div>
        </>
     
  );
      }  
          
export default React.memo(MakerWindow);
