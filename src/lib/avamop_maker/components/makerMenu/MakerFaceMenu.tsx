import React, { useState } from "react";
import MakerFaceButton from "./MakerFaceButton";
import styles from "../../module-css/makerMenu/MakerFaceMenu.module.css"; // CSSファイルをインポート
import { Swiper, SwiperSlide } from 'swiper/react';

interface MakerFaceMenuProps {
  faceList: string[];
  isLoading: boolean;
  // faceImages: string[];
  changeFace: (face: string) => void;
}

const MakerFaceMenu: React.FC<MakerFaceMenuProps> = ({
  faceList,
  changeFace,
  // faceImages
}) => {
  const [showSwiper, setShowSwiper] = useState(false);
  return (
    <>
    <button className={styles["face-show-button"]} onClick={() => setShowSwiper(!showSwiper)}>
      {showSwiper ? <img className={styles["swiper-face-image"]} src="../../../../../examples/assets/provisionals/provisionalclose.png" alt="Hide Face" />
          : <img className={styles["swiper-face-image"]} src="../../../../../examples/assets/provisionals/provisionalopen.png" alt="Show Face" />}
    </button>
    {showSwiper && (
      <Swiper
        className={styles['scroll-bar-swiper']}
        slidesPerView='auto'
        freeMode={true}
        spaceBetween={10}
      >
      {faceList.map((face) => (
        <SwiperSlide key={face} style={{ width: '180px' }}>
        <MakerFaceButton
          key={face}
          face={face}
          // 表情のサムネイルを用意する予定
          // faceImages= {faceImages[face]}
          onClick={() => changeFace(face)}
        />
        </SwiperSlide>
      ))}
  </Swiper>
  )}
  </>
  );
};
export default React.memo(MakerFaceMenu);
