import React from "react";
import styles from "../../module-css/makerMenu/MakerPartsButton.module.css";
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
      <li className={styles["parts-button"]} onClick={onClick}>
         {/* パーツ画像 */}
        <img className={styles["parts-img"]} src={buttonImage} alt={item} />
      </li>
    );
  };
export default React.memo(MakerPartsButton);
