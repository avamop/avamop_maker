
import React, { useState, useEffect } from "react";
import MakerFaceButton from "./MakerFaceButton";
import styles from "../../module-css/makerMenu/MakerFaceMenu.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


interface MakerFaceMenuProps {
  faceList: string[];
  isLoading: boolean;
  changeFace: (face: string) => void;
}

const MakerFaceMenu: React.FC<MakerFaceMenuProps> = ({
  faceList,
  changeFace,
}) => {

  const [showMenu, setShowMenu] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({left: '4px', top: '0px'});

  useEffect(() => {
    const updateButtonPosition = () => {
      setButtonPosition({
        left: `${window.innerWidth / 2}px`,
        top: `${window.innerHeight / 2}px`
      });
    };

    window.addEventListener('resize', updateButtonPosition);
    updateButtonPosition();

    return () => window.removeEventListener('resize', updateButtonPosition);
  }, []);

  return (
    <div style={{ position: "relative" }}>
    <button
      style={{ display: "block", margin: "auto" }}
      onClick={() => setShowMenu(!showMenu)}
    >
      {showMenu ? (
        <img
          className={styles["face-button"]}
          src={`/faceMenu.png`}
          alt="Hide Faces"
          style={{ width: "100px", height: "100px" }}
        />
      ) : (
        <img
          className={styles["face-button"]}
          src={`/faceMenu.png`}
          alt="Show Faces"
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </button>
      {showMenu && (
        <ul
          className={styles["face-menu"]}
        >
          {faceList.map((face, i) => (
            <MakerFaceButton
              key={face}
              face={face}
              onClick={() => {
                changeFace(face);
                setShowMenu(false);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  )
const [showSwiper, setShowSwiper] = useState(false);
return (
  <>
    <button className={styles["face-show-button"]} onClick={() => setShowSwiper(!showSwiper)}>
      {showSwiper ? <img className={styles["swiper-color-image"]} src="../../../../../examples/assets/provisionals/provisionalclose.png" alt="Hide Face" />
          : <img className={styles["swiper-color-image"]} src="../../../../../examples/assets/provisionals/provisionalopen.png" alt="Show Face" />}
    </button>
    {showSwiper && (
      <Swiper
        className={styles['scroll-bar-swiper']}
        slidesPerView='auto'
        freeMode={true}
        spaceBetween={10}
      >
    <ul className={styles['face-menu']}>
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
    </ul>
  </Swiper>
  )}
  </>
);

};

export default React.memo(MakerFaceMenu);






