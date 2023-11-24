import React, { useState, useEffect } from "react";
import { MakerViewStatusGen } from "./functions/fetchData/MakerViewStatusGen";
import { MakerFaceGen } from "./functions/fetchData/MakerFaceGen";
import MakerView from "./MakerView/MakerView";
import MakerPartsMenu from "./makerMenu/MakerPartsMenu";
import MakerFaceMenu from "./makerMenu/MakerFaceMenu";
import { MakerChangePart } from "./functions/fetchData/MakerChangePart";
import { MakerConvertPartsIcon } from "./functions/imageProcess/MakerConvertPartsIcon";
import { MakerConvertPartsJimp } from "./functions/objectProcess/MakerConvertPartsJimp";
import { MakerFetchCategoryIcons } from "./functions/imageProcess/MakerFetchCategoryIcons";
interface MakerMenuProps {
  path: string;
  partObject: PartObjectMerged;
  thumbnailObject: MenuThumbnail;
}

const MakerWindow: React.FC<MakerMenuProps> = ({
  path,
  partObject,
  thumbnailObject,
}) => {
  const viewStatus: ViewStatus = MakerViewStatusGen(partObject);
  const faceList: string[] = MakerFaceGen(partObject);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<ViewStatus>(viewStatus);
  const [selectedFace, setSelectedFace] = useState<string>("normal");
  const [categoryIcon, setCategoryIcon] = useState<MenuThumbnail | null>(null);
  const [menuPartIcon, setMenuPartIcon] =
    useState<CombinePartIconsObjectBase64 | null>(null);
  const [partObjectJimp, setPartObjectJimp] = useState<PartObjectJimp | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeFace = (face: string) => {
    setSelectedFace(face);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmpCategoryIcon = await MakerFetchCategoryIcons(
          thumbnailObject,
          path + "thumbnails/"
        );
        const tmpPartObjectJimp: PartObjectJimp = await MakerConvertPartsJimp(
          partObject,
          path + "parts/"
        );
        setPartObjectJimp(tmpPartObjectJimp);
        const menuPartIconList: Promise<CombinePartIconsObjectBase64> =
          MakerConvertPartsIcon(tmpPartObjectJimp);
        setCategoryIcon(tmpCategoryIcon);
        setMenuPartIcon(await menuPartIconList);
        setIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
      } catch (error) {
        console.log("データ読み込みエラー:", error);
        setIsLoading(false); // エラーが発生した場合もisLoadingをfalseに設定
      }
    };
    fetchData();
  }, []); // 空の依存リストを指定して初回のみ実行されるように

  return (
    <div>
      {/* 画像データのロードが終わったら中身を表示する */}
      {isLoading && !partObjectJimp && !menuPartIcon ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* アバターメーカーのアバター表示部分 */}
          <MakerView
            selectedParts={selectedParts}
            partObjectJimp={partObjectJimp}
            selectedFace={selectedFace}
          />
          {/* アバターメーカーの表情メニュー部分 */}
          <MakerFaceMenu
            faceList={faceList}
            isLoading={isLoading}
            changeFace={changeFace}
          />
          {/* アバターメーカーのパーツメニュー部分 */}
          <MakerPartsMenu
            isLoading={isLoading}
            thumbnailObject={categoryIcon}
            selectedCategory={selectedCategory}
            selectedFace={selectedFace}
            handleCategoryClick={handleCategoryClick}
            changePart={MakerChangePart}
            menuPartIcon={menuPartIcon}
            selectedParts={selectedParts}
            setSelectedParts={setSelectedParts}
          />
        </>
      )}
      {/* オブジェクト変化テスト用ボタン */}
      <button onClick={() => console.log("%o", selectedParts)}>button</button>
    </div>
  );
};

export default React.memo(MakerWindow);
