import * as React from "react";
import styles from "../../module-css/makerMenu/MakerPartsCategories.module.css";

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
    <li className={styles["menuCategoryStyle"]}>
      <img onClick={onClick} src={imageSrc} alt={category} />
    </li>
  );
};

export default React.memo(MakerPartsCategories);
