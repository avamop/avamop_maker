import React, { useContext } from "react";
import * as styles from "../../module-css/makerMenu/MakerColorsButton.module.css";
import "swiper/css";
interface MakerColorsButton {
  colorCode: string;
  colorName: string;
  onClick: () => void;
  isLoading: boolean;
}

const MakerColorsButton: React.FC<MakerColorsButton> = ({
  colorCode,
  colorName,
  onClick,
  isLoading,
}) => {
  // <li>タグを<button>タグに変更する
  return (
    <button
      className={isLoading ? styles["colorListLoading"] : styles["colorList"]}
      style={{ backgroundColor: colorCode }}
      onClick={onClick}
    >
      <p>{colorName}</p>
    </button>
  );
};

export default MakerColorsButton;
