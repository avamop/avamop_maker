import React, { useState, useEffect } from "react";
import { MakerViewStatusGen } from "./functions/MakerViewStatusGen";
import { MakerFaceGen } from "./functions/MakerFaceGen";
import MakerView from "./MakerView";
import MakerPartsMenu from "./MakerPartsMenu";
import MakerFaceMenu from "./MakerFaceMenu";
import { MakerChangePart } from "./functions/MakerChangePart";
import { MakerFetchPartsData } from "./functions/MakerFetchPartsData";
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

  const changeFace = (face: string) => {
    setSelectedFace(face);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  useEffect(() => {
    MakerFetchPartsData(partObject, path, setMenuPartIconCache, setIsLoading);
  }, []); // 空の依存リストを指定して初回のみ実行されるように

  return (
    <div>
      <MakerView
        selectedParts={selectedParts}
        partObject={partObject}
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
        menuPartIconCache={menuPartIconCache}
        selectedParts={selectedParts}
        setSelectedParts={setSelectedParts}
      />
      <button onClick={() => console.log("%o", selectedParts)}>button</button>
    </div>
  );
};

export default React.memo(MakerWindow);
