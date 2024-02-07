import React from "react";
import * as styles from "../../module-css/makerMenu/MakerPartsButton.module.css";
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
    <li className={styles["partsButtonStyle"]} onClick={onClick}>
      {/* パーツ画像 */}
      <img className={styles["partsImg"]} src={buttonImage} alt={item} />
    </li>
  );
};
export default React.memo(MakerPartsButton);
