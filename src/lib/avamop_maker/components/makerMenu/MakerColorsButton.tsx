import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../../module-css/makerMenu/MakerColorsButton.module.css'
import 'swiper/css';

interface MakerColorsButton {
  colorCode: string;
  colorName: string;
}

const MakerColorsButton: React.FC<MakerColorsButton> = ({
  colorCode,
  colorName,
}) => {
  // <li>タグを<button>タグに変更する
  return (
    <button className={styles['colorlist']} style={{backgroundColor: colorCode}}>
    <p>{colorName}</p>
  </button>
  );
}



export default MakerColorsButton;
