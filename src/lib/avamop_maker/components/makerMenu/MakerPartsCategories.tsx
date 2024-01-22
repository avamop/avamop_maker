import * as React from "react";
import styles from "../../module-css/makerMenu/MakerPartsCategories.module.css";

interface MakerPartsButtonProps {
  item: string;
  buttonImage: string;
  onClick: () => void;
}

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({
  onClick,
  item,
  buttonImage,
}) => {
  
  return (
      <li className={styles['menu-category']}>
        <img onClick={onClick} src={imageSrc} alt={category} />
      </li>
  );
};

export default React.memo(MakerPartsButton);

