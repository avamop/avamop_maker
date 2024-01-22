
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
    <Swiper
      slidesPerView="auto"
      freeMode={true}
      spaceBetween={0}
    >
    <div style={{ position: "relative" }}>
      <SwiperSlide>
        <button
          className={styles["face-button"]}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <div>閉じる</div>
          ) : (
            <div>表情差分</div>
          )}
        </button>
      {showMenu && (
        <ul
          className={styles["face-menu"]}
        >
          {faceList.map((face, i) => (
              <MakerFaceButton
                key={face.face}
                face={face.face}
                faceImage={facePath + face.image}
                onClick={() => console.log(face)}
              />
          ))}
        </ul>
      )}
      </SwiperSlide>
    </div>
    </Swiper>
  );
};

export default React.memo(MakerFaceMenu);






