import React, { useState, useEffect } from "react";
import MakerPartsCategories from "./MakerPartsCategories";
import { MakerViewStatusGen } from "./MakerViewStatusGen";
import { MakerConvertPartList } from "./MakerConvertPartList";
import { MakerSplitCombine } from "./MakerSplitCombine";
// import { MakerFaceGen } from "./MakerFaceGen";
// import { MakerFaceMenu } from "./MakerFaceMenu";
import MakerPartsButton from "./MakerPartsButton";

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
  // const faceList: FaceList = MakerFaceGen(partObject);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<ViewStatus>(viewStatus);
  const [selectedFace, setSelectedFace] = useState<string>("normal");
  const [menuPartIconCache, setMenuPartIconCache] =
    useState<PartObjectBase64 | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const updateCategoryItem = (category: string, key: string, value: string) => {
    const updateAvaters = {
      ...selectedParts,
      [category]: {
        ...selectedParts[category],
        [key]: value,
      },
    };
    setSelectedParts(updateAvaters);
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
              path + "parts/",
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
      <ul>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          Object.keys(viewStatus).map((category) => (
            <MakerPartsCategories
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
              imageSrc={
                path +
                "thumbnails/" +
                thumbnailObject[category.replace(/_\d+$/, "")].pathUrl
              }
            >
              {Object.keys(
                menuPartIconCache[category.replace(/_\d+$/, "")].partList,
              ).map((item) => (
                <MakerPartsButton
                  key={item}
                  item={item}
                  buttonImage={
                    menuPartIconCache[category.replace(/_\d+$/, "")].partList[
                      item
                    ].faces[selectedFace ?? "normal"].part
                  }
                  onClick={() =>
                    updateCategoryItem(category, "partName", item.toString())
                  }
                />
              ))}
            </MakerPartsCategories>
          ))
        )}{" "}
      </ul>
      <button onClick={() => console.log("%o", selectedParts)}>button</button>
    </div>
  );
};

export default React.memo(MakerMenu);
