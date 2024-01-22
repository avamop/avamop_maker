import * as React from "react";
import type { ReactNode } from "react";
import "../../module-css/makerMenu/MakerPartsCategories.module.css";

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({
  imageSrc,
  category,
  isSelected,
  onClick,
}) => {
  return (
    <li className={`menuCategory ${isSelected ? "selected" : ""}`}>
      <img onClick={onClick} src={imageSrc} alt={category} /> {category}
    </li>
  );
};

export default React.memo(MakerPartsCategories);
