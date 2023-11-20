import React, { useState, useEffect } from "react";
import { MakerViewStatusGen } from "./functions/MakerViewStatusGen";
import { MakerFaceGen } from "./functions/MakerFaceGen";
import MakerView from "./MakerView";
import MakerPartsMenu from "./MakerPartsMenu";
import MakerFaceMenu from "./MakerFaceMenu";
import { MakerChangePart } from "./functions/MakerChangePart";
import { MakerFetchPartsData } from "./functions/MakerFetchPartsData";
import { MakerConvertPartsJimp } from "./functions/MakerConvertPartsJimp";
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
  const [menuPartIcon, setMenuPartIcon] =
    useState<CombinePartIconsObjectBase64 | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeFace = (face: string) => {
    setSelectedFace(face);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  let partObjectJimp: PartObjectJimp;

  useEffect(() => {
    partObjectJimp = MakerConvertPartsJimp(partObject, path + "parts/");
    MakerFetchPartsData(partObjectJimp, setMenuPartIcon, setIsLoading);
  }, []); // 空の依存リストを指定して初回のみ実行されるように

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MakerView
            selectedParts={selectedParts}
            partObjectJimp={partObjectJimp}
            selectedFace={selectedFace}
          />
          <MakerFaceMenu
            faceList={faceList}
            isLoading={isLoading}
            changeFace={changeFace}
          />
          <MakerPartsMenu
            isLoading={isLoading}
            path={path}
            thumbnailObject={thumbnailObject}
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
      <button onClick={() => console.log("%o", selectedParts)}>button</button>
    </div>
  );
};

export default React.memo(MakerWindow);
