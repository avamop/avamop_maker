import React from "react";
import MakerPartsButton from "./MakerPartsButton";
import MakerPartsCategories from "./MakerPartsCategories";

interface MakerPartsMenuProps {
  selectedCategory: string | null;
  selectedFace: string;
  path: string;
  thumbnailObject: MenuThumbnail;
  selectedParts: ViewStatus;
  setSelectedParts: React.Dispatch<React.SetStateAction<ViewStatus>>;
  handleCategoryClick: (category: string) => void;
  changePart: (
    category: string,
    bodyTypeValue: number[],
    partNameValue: string,
    selectedParts: ViewStatus,
    setSelectedParts: React.Dispatch<React.SetStateAction<ViewStatus>>
  ) => void;
  menuPartIconCache: PartObjectBase64;
  isLoading: boolean;
}

const MakerPartsMenu: React.FC<MakerPartsMenuProps> = ({
  selectedCategory,
  selectedFace,
  path,
  thumbnailObject,
  handleCategoryClick,
  changePart,
  selectedParts,
  setSelectedParts,
  menuPartIconCache,
  isLoading,
}) => {
  return (
    <>
      <ul>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          Object.keys(selectedParts.category).map((category) => (
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
              {category === "body"
                ? Object.keys(
                    menuPartIconCache[category.replace(/_\d+$/, "")].partList
                  ).map((item) => (
                    <MakerPartsButton
                      key={item}
                      item={item}
                      buttonImage={
                        menuPartIconCache[category.replace(/_\d+$/, "")]
                          .partList[item].faces[selectedFace]
                          ? menuPartIconCache[category.replace(/_\d+$/, "")]
                              .partList[item].faces[selectedFace].part
                          : menuPartIconCache[category.replace(/_\d+$/, "")]
                              .partList[item].faces["normal"].part
                      }
                      onClick={() =>
                        changePart(
                          category,
                          menuPartIconCache[category.replace(/_\d+$/, "")]
                            .partList[item].bodyType,
                          item,
                          selectedParts,
                          setSelectedParts
                        )
                      }
                    />
                  ))
                : Object.keys(
                    menuPartIconCache[category.replace(/_\d+$/, "")].partList
                  ).map((item) =>
                    menuPartIconCache[category.replace(/_\d+$/, "")].partList[
                      item
                    ].bodyType === null ||
                    menuPartIconCache[category.replace(/_\d+$/, "")].partList[
                      item
                    ].bodyType.includes(selectedParts.bodyType) ? (
                      <MakerPartsButton
                        key={item}
                        item={item}
                        buttonImage={
                          menuPartIconCache[category.replace(/_\d+$/, "")]
                            .partList[item].faces[selectedFace]
                            ? menuPartIconCache[category.replace(/_\d+$/, "")]
                                .partList[item].faces[selectedFace].part
                            : menuPartIconCache[category.replace(/_\d+$/, "")]
                                .partList[item].faces["normal"].part
                        }
                        onClick={() =>
                          changePart(
                            category,
                            menuPartIconCache[category.replace(/_\d+$/, "")]
                              .partList[item].bodyType,
                            item,
                            selectedParts,
                            setSelectedParts
                          )
                        }
                      />
                    ) : null
                  )}
            </MakerPartsCategories>
          ))
        )}{" "}
      </ul>
    </>
  );
};

export default React.memo(MakerPartsMenu);
