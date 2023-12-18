import React, { useContext } from "react";
import MakerPartsButton from "./MakerPartsButton";
import MakerPartsCategories from "./MakerPartsCategories";
import MakerChangingPart from "../functions/fetchData/MakerChangingPart";
import SelectedCategoryContext from "../../store/SelectedCategoryContext";
import SelectedPartsContext from "../../store/SelectedPartsContext";
import MenuPartIconsContext from "../../store/MenuPartIconsContext";
import PartsObjectContext from "../../store/PartsObjectContext";

const MakerPartsMenu: React.FC = ({}) => {
  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);
  const { selectedCategory, setSelectedCategory } = useContext(
    SelectedCategoryContext
  );
  const partsObject = useContext(PartsObjectContext);
  const menuPartIcons = useContext(MenuPartIconsContext);
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  return (
    <>
      <ul>
        {Object.keys(selectedParts.category).map((category) => (
          <MakerPartsCategories
            key={category}
            category={category}
            isSelected={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
            imageSrc={
              selectedParts.category[category].partName
                ? menuPartIcons[category.replace(/_\d+$/, "")].partList[
                    selectedParts.category[category].partName
                  ].faces[
                    selectedParts.selectedFace[category]
                      ? selectedParts.selectedFace[category]
                      : "clear"
                  ].imagePath
                : menuPartIcons[category.replace(/_\d+$/, "")].partList[
                    Object.keys(
                      menuPartIcons[category.replace(/_\d+$/, "")].partList
                    )[0]
                  ].faces[
                    selectedParts.selectedFace[category]
                      ? selectedParts.selectedFace[category]
                      : "clear"
                  ].imagePath
            }
          />
        ))}
      </ul>
      {Object.keys(selectedParts.category).map((category) =>
        selectedCategory === category
          ? Object.keys(
              menuPartIcons[category.replace(/_\d+$/, "")].partList
            ).map((item) =>
              category === "body" ||
              menuPartIcons[category.replace(/_\d+$/, "")].partList[item]
                .bodyType === null ||
              menuPartIcons[category.replace(/_\d+$/, "")].partList[
                item
              ].bodyType.includes(selectedParts.bodyType) ? (
                <MakerPartsButton
                  key={item}
                  item={item}
                  buttonImage={
                    menuPartIcons[category.replace(/_\d+$/, "")].partList[item]
                      .faces["clear"].imagePath
                  }
                  onClick={() =>
                    MakerChangingPart(
                      category,
                      menuPartIcons[category.replace(/_\d+$/, "")].partList[
                        item
                      ].bodyType,
                      item,
                      selectedParts,
                      setSelectedParts,
                      partsObject
                    )
                  }
                />
              ) : null
            )
          : null
      )}
      {/* オブジェクト変化テスト用ボタン */}
      <button onClick={() => console.log(selectedParts)}>button</button>
    </>
  );
};

export default React.memo(MakerPartsMenu);
