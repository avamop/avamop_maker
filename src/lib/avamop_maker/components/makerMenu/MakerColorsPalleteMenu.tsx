import React, { useContext, useState, useEffect } from "react";
import MakerColorsButton from "./MakerColorsButton";
import styles from "../../module-css/makerMenu/MakerColorsPallete.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // 追加: SwiperのCSSをインポート

import ColorsObjectContext from "../../store/ColorsObjectContext";

const MakerColorsPalleteMenu: React.FC = ({}) => {
  const [showSwiper, setShowSwiper] = useState(false);
  const [touchRatio, setTouchRatio] = useState(0); // touchRatioのstateを追加
  const colorsObject = useContext(ColorsObjectContext);

  // colors.jsonを非同期に読み込み、その要素数を取得
  useEffect(() => {
    fetch('/examples/colors.json')
      .then((response) => response.json())
      .then((json) => {
        const length = Object.keys(json).length; // 要素数を取得[^1^][1]
        setTouchRatio(length); // touchRatioを設定
      });
  }, []);

  return (
    <>
    <button className={styles["color-show-button"]} onClick={() => setShowSwiper(!showSwiper)}>
      {showSwiper ? <img className={styles["swiper-color-image"]} src="../../../../../examples/assets/provisionals/provisionalclose.png" alt="Hide Face" />
          : <img className={styles["swiper-color-image"]} src="../../../../../examples/assets/provisionals/provisionalopen.png" alt="Show Face" />}
    </button>
    <div>{touchRatio}</div>
    {showSwiper && (
      <Swiper
        className={styles['scroll-bar-swiper']}
        slidesPerView='auto'
        freeMode={true}
        spaceBetween={0}
        touchRatio={touchRatio/20}
      >
        <ul>
          {Object.keys(colorsObject).map((colorName) => (
          <SwiperSlide key={colorName} style={{ width: '50px' }}>
            <MakerColorsButton
              key={colorName}
              colorCode={colorsObject[colorName]}
              colorName={colorName}
            />
          </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    )}
    </>
  );
};

export default MakerColorsPalleteMenu;
