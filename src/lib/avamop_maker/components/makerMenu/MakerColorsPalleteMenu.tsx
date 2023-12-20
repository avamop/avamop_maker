import React, { useContext, useState } from "react";
import MakerColorsButton from "./MakerColorsButton";
import styles from "../../module-css/makerMenu/MakerColorsPallete.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';

import ColorsObjectContext from "../../store/ColorsObjectContext";

const MakerColorsPalleteMenu: React.FC = ({}) => {
  const [showSwiper, setShowSwiper] = useState(false);
  const colorsObject = useContext(ColorsObjectContext);
  return (
    <>
    <button className={styles["colorbutton"]}onClick={() => setShowSwiper(!showSwiper)}>
      {showSwiper ? 'Hide Color' : 'Show Color'}
    </button>
 
    {showSwiper && (
 <Swiper
 className={styles['scroll-bar-swiper']}
 slidesPerView='auto'
 freeMode={true}
 spaceBetween={0}
 autoplay={{
   delay: 2500,
   disableOnInteraction: false,
 }}
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

