import React, { useState, useEffect } from "react";
import { MakerViewStatusGen } from "./functions/MakerViewStatusGen";
import { MakerConvertPartList } from "./functions/MakerConvertPartList";
import { MakerSplitCombine } from "./functions/MakerSplitCombine";
import { MakerFaceGen } from "./functions/MakerFaceGen";
import MakerView from "./MakerView";
import MakerPartsMenu from "./MakerPartsMenu";
import MakerFaceMenu from "./MakerFaceMenu";
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
  const [menuPartIconCache, setMenuPartIconCache] =
    useState<PartObjectBase64 | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const changePart = (
    category: string,
    key: string,
    bodyTypeValue: BodyType<typeof category>,
    partNameValue: string
  ) => {
    if (category === "body") {
      try {
        if (Array.isArray(bodyTypeValue)) {
          throw new Error(
            "エラー:bodyのbodyTypeプロパティが配列になっています"
          );
        } else if (bodyTypeValue === 0) {
          throw new Error("エラー:bodyのbodyTypeプロパティが0になっています");
        } else {
          const updateAvaters: ViewStatus = {
            bodyType: bodyTypeValue,
            category: {
              ...selectedParts.category,
              [category]: {
                ...selectedParts.category[category],
                [key]: {
                  partName: partNameValue,
                },
              },
            },
          };
          setSelectedParts(updateAvaters);
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        if (!Array.isArray(bodyTypeValue) && bodyTypeValue !== 0) {
          throw new Error(
            `エラー:${category}のbodyTypeプロパティが配列になっていません`
          );
        }
        const updateAvaters: ViewStatus = {
          bodyType: selectedParts.bodyType,
          category: {
            ...selectedParts.category,
            [category]: {
              ...selectedParts.category[category],
              [key]: {
                partName: partNameValue,
              },
            },
          },
        };
        setSelectedParts(updateAvaters);
      } catch (error) {
        console.error(error.message);
      }
    }
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
        const convertPartObject: ConvertPartObject = {};
        for (const category in partObject) {
          const convertPartList: CategoryItemsCombined<typeof category> =
            MakerConvertPartList(partObject[category].partList);
          convertPartObject[category] = {
            partList: convertPartList,
          };
        }
        const menuPartIconList: PartObjectBase64 = {};
        for (const category in convertPartObject) {
          menuPartIconList[category] = {
            partList: {},
          };
          for (const item in convertPartObject[category].partList) {
            const partList: CategoryItemsBase64<typeof category> = {
              bodyType: convertPartObject[category].partList[item].bodyType,
              faces: await MakerSplitCombine(
                convertPartObject[category].partList[item].peaces,
                path + "parts/"
              ),
            };
            menuPartIconList[category].partList[item] = partList;
          }
        }
        setMenuPartIconCache(menuPartIconList);
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
      <MakerView />
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

export default React.memo(MakerWindow);
