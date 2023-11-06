import React, { useState, useEffect } from "react";
import { MakerViewStatusGen } from "./functions/MakerViewStatusGen";
import { MakerConvertPartList } from "./functions/MakerConvertPartList";
import { MakerSplitCombine } from "./functions/MakerSplitCombine";
import { MakerFaceGen } from "./functions/MakerFaceGen";
import MakerPartsMenu from "./MakerPartsMenu";
import MakerFaceMenu from "./MakerFaceMenu";
interface MakerMenuProps {
  path: string;
  partObject: PartObjectMerged;
  thumbnailObject: MenuThumbnail;
}

const MakerMenu: React.FC<MakerMenuProps> = ({
  path,
  partObject,
  thumbnailObject,
}) => {
  const viewStatus: ViewStatus = MakerViewStatusGen(partObject);
  const faceList: string[] = MakerFaceGen(partObject);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<ViewStatus>(viewStatus);
  const [selectedFace, setSelectedFace] = useState<string>("normal");
  const [menuPartIconCache, setMenuPartIconCache] =
    useState<PartObjectBase64 | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const changePart = (category: string, key: string, value: string) => {
    const updateAvaters = {
      ...selectedParts,
      [category]: {
        ...selectedParts[category],
        [key]: value,
      },
    };
    setSelectedParts(updateAvaters);
  };

  const changeFace = (face: string) => {
    setSelectedFace(face);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const convertPartObject = {};
        for (const category in partObject) {
          convertPartObject[category] = {
            partList: MakerConvertPartList(partObject[category].partList),
          };
        }
        const newMenuPartIconCache = {};
        for (const category in convertPartObject) {
          newMenuPartIconCache[category] = { partList: {} };
          for (const item in convertPartObject[category].partList) {
            newMenuPartIconCache[category].partList[item] = { faces: {} };
            const result = await MakerSplitCombine(
              convertPartObject[category].partList[item].peaces,
              path + "parts/"
            );
            newMenuPartIconCache[category].partList[item] = {
              faces: result,
            };
          }
        }

        setMenuPartIconCache(newMenuPartIconCache);
        setIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
      } catch (error) {
        console.log("データ読み込みエラー:", error);
        setIsLoading(false); // エラーが発生した場合もisLoadingをfalseに設定
      }
    }

    fetchData();
  }, []); // 空の依存リストを指定して初回のみ実行されるように

  return (
    <div>
      <MakerFaceMenu
        faceList={faceList}
        isLoading={isLoading}
        changeFace={changeFace}
      />
      <MakerPartsMenu
        isLoading={isLoading}
        path={path}
        thumbnailObject={thumbnailObject}
        viewStatus={selectedParts}
        selectedCategory={selectedCategory}
        selectedFace={selectedFace}
        handleCategoryClick={handleCategoryClick}
        changePart={changePart}
        menuPartIconCache={menuPartIconCache}
      />
      <button onClick={() => console.log("%o", selectedParts)}>button</button>
    </div>
  );
};

export default React.memo(MakerMenu);
