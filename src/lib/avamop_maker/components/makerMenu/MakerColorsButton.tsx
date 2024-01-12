import React, { useContext } from "react";
import styles from "../../module-css/makerMenu/MakerColorsButton.module.css";
import "swiper/css";
interface MakerColorsButton {
  colorCode: string;
  colorName: string;
  onClick: () => void;
}

const MakerColorsButton: React.FC<MakerColorsButton> = ({
  colorCode,
  colorName,
  onClick,
}) => {
  // <li>タグを<button>タグに変更する
  return (
    <button
      className={styles["colorlist"]}
      style={{ backgroundColor: colorCode }}
      onClick={onClick}
    >
      <p>{colorName}</p>
    </button>
  );
};

export default MakerColorsButton;
