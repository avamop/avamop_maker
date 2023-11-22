import * as React from "react";
import type { ReactNode } from "react";

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  children: ReactNode;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({
  imageSrc,
  category,
  isSelected,
  onClick,
  children,
}) => {
  return (
    <li className={isSelected ? "selected" : ""}>
      <img onClick={onClick} src={imageSrc} alt={category} /> {category}
      <ul>
        {/* カテゴリーボタンの開閉 */}
        {isSelected ? children : null}
      </ul>
    </li>
  );
};

export default React.memo(MakerPartsCategories);
