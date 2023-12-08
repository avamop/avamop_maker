import React from "react";
import styles from '../../module-css/makerMenu/MakerColorsButton.module.css'

interface MakerColorsButton {
  colorCode: string;
  colorName: string;
}

const MakerColorsButton: React.FC<MakerColorsButton> = ({
  colorCode,
  colorName,
}) => {
  return <li className={styles['colorlist']} color={colorCode}>{colorName}</li>;
};

export default MakerColorsButton;
