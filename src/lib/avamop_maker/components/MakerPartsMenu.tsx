import React from "react";
import MakerPartsButton from "./MakerPartsButton";
import MakerPartsCategories from "./MakerPartsCategories";

interface MakerPartsMenuProps {
  viewStatus: ViewStatus;
  selectedCategory: string | null;
  selectedFace: string;
  path: string;
  thumbnailObject: MenuThumbnail;
  handleCategoryClick: (category: string) => void;
  changePart: (category: string, key: string, value: string) => void;
  menuPartIconCache: PartObjectBase64;
  isLoading: boolean;
}

const MakerPartsMenu: React.FC<MakerPartsMenuProps> = ({
  viewStatus,
  selectedCategory,
  selectedFace,
  path,
  thumbnailObject,
  handleCategoryClick,
  changePart,
  menuPartIconCache,
  isLoading,
}) => {
  return (
    <>
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
                menuPartIconCache[category.replace(/_\d+$/, "")].partList
              ).map((item) => (
                <MakerPartsButton
                  key={item}
                  item={item}
                  buttonImage={
                    menuPartIconCache[category.replace(/_\d+$/, "")].partList[
                      item
                    ].faces[selectedFace]
                      ? menuPartIconCache[category.replace(/_\d+$/, "")]
                          .partList[item].faces[selectedFace].part
                      : menuPartIconCache[category.replace(/_\d+$/, "")]
                          .partList[item].faces["normal"].part
                  }
                  onClick={() =>
                    changePart(category, "partName", item.toString())
                  }
                />
              ))}
            </MakerPartsCategories>
          ))
        )}{" "}
      </ul>
    </>
  );
};

export default React.memo(MakerPartsMenu);
