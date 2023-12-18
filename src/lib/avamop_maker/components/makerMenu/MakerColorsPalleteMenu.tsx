import React, { useState } from "react";
import MakerColorsButton from "./MakerColorsButton";
import styles from "../../module-css/makerMenu/MakerColorsPallete.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';

interface MakerColorsPalleteMenuProps {
  colorsObject: ColorsObject;
}

const MakerColorsPalleteMenu: React.FC<MakerColorsPalleteMenuProps> = ({
  colorsObject,
}) => {
  const [showSwiper, setShowSwiper] = useState(false);

  return (
    <>
    <button className={styles["color-show-button"]} onClick={() => setShowSwiper(!showSwiper)}>
      {showSwiper ? <img className={styles["swiper-color-image"]} src="../../../../../examples/assets/provisionals/provisionalclose.png" alt="Hide Face" />
          : <img className={styles["swiper-color-image"]} src="../../../../../examples/assets/provisionals/provisionalopen.png" alt="Show Face" />}
    </button>
    {showSwiper && (
      <Swiper
        className={styles['scroll-bar-swiper']}
        slidesPerView='auto'
        freeMode={true}
        spaceBetween={0}
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