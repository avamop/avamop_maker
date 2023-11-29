import * as React from "react";
import type { ReactNode } from "react";

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
    <li className={isSelected ? "selected" : ""}>
      <img onClick={onClick} src={imageSrc} alt={category} /> {category}
    </li>
  );
};

export default React.memo(MakerPartsCategories);
