import React from 'react'

import MakerPartsButton from "./MakerPartsButton";

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  faces: string;
  path: string;
  categoryItems: CategoryMerged;
  updateCategoryItem: (category: string, key: string, value: string) => void;
}

const convertPartList = (categoryItems: CategoryMerged): CategoryItemsCombined => {
  const categoryItemsCombined: CategoryItemsCombined = {};
  for (const partSplit in categoryItems) {
    const partData = categoryItems[partSplit];
    for (const item in partData.items) {
      if (!categoryItemsCombined[item]) {
        categoryItemsCombined[item] = {
          body: partData.items[item].body,
          peaces: {}
        };
      } else {
        categoryItemsCombined[item].body = partData.items[item].body;
      }
      if (!categoryItemsCombined[item].peaces) {
        categoryItemsCombined[item].peaces = {};
      }
      categoryItemsCombined[item].peaces[partSplit] = {
        faces: partData.items[item].faces,
      };
    }
  }
  return categoryItemsCombined;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({
  path,
  imageSrc,
  category,
  isSelected,
  faces,
  onClick,
  updateCategoryItem,
  categoryItems,
}) => {
  const buttonImageList: CategoryItemsCombined = convertPartList(categoryItems)
  // console.log(buttonImageList)
  return (
    <li className={isSelected ? "selected" : ""}>
      <img onClick={onClick} src={imageSrc} alt={category} /> {category}
      {(isSelected && (
        <ul>
          {Object.keys(buttonImageList).map((item) => (
            <MakerPartsButton
              path={path}
              key={item}
              item={item}
              faces={faces}
              buttonImages={buttonImageList[item].peaces}
              onClick={() =>
                updateCategoryItem(category, "partName", item.toString())
              }
            />
          ))}
        </ul>
      )
      )}
    </li>
  );
};

export default MakerPartsCategories;
