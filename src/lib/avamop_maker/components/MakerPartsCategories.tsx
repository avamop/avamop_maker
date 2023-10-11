import MakerPartsButton from "./MakerPartsButton";
import { useState, useEffect } from "react";

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  path: string;
  categoryItems: Items | Items[];
  updateCategoryItem: (category: string, key: string, value: string) => void;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({
  path,
  imageSrc,
  category,
  isSelected,
  onClick,
  updateCategoryItem,
  categoryItems,
}) => {
  return (
    <li className={isSelected ? "selected" : ""}>
      <img onClick={onClick} src={imageSrc} alt={category} /> {category}
      {isSelected && (
        <ul>
          {Object.keys(categoryItems).map((item) => (
            <MakerPartsButton
              key={item}
              item={item}
              path={path}
              imageSrc={categoryItems[item].normal.facePath}
              onClick={() =>
                updateCategoryItem(category, "partName", item.toString())
              }
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MakerPartsCategories;
