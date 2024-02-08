import React, { useState, useEffect, useContext } from "react";
import MakerFaceButton from "./MakerFaceButton";
import styles from "../../module-css/makerMenu/MakerFaceMenu.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import FaceListContext from "../../store/FaceListContext";
import FacePathContext from "../../store/FacePathContext";
import SelectedPartsContext from "../../store/SelectedPartsContext";

const MakerFaceMenu: React.FC = () => {
  const faceList: FaceList[] = useContext(FaceListContext);
  // console.log(faceList);
  const facePath: string = useContext(FacePathContext);

  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);
  const [showMenu, setShowMenu] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    left: "4px",
    top: "0px",
  });

  const changeFace = (face: string) => {
    let updateFace: SelectedParts = {
      ...selectedParts,
      selectedFace: {
        ...selectedParts.selectedFace,
      },
    };
    for (const category in selectedParts.selectedFace) {
      updateFace.selectedFace[category] = face;
    }
    setSelectedParts(updateFace);
  };

  // useEffect(() => {
  //   const updateButtonPosition = () => {
  //     setButtonPosition({
  //       left: `${window.innerWidth / 2}px`,
  //       top: `${window.innerHeight / 2}px`,
  //     });
  //   };

  //   window.addEventListener("resize", updateButtonPosition);
  //   updateButtonPosition();

  //   return () => window.removeEventListener("resize", updateButtonPosition);
  // }, []);

  return (
    <Swiper slidesPerView="auto" freeMode={true} spaceBetween={0}>
      <div style={{ position: "relative" }}>
        <SwiperSlide>
          <button
            className={styles["faceButtonStyle"]}
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <div>閉じる</div> : <div>表情差分</div>}
          </button>
          {showMenu && (
            <ul className={styles["faceMenuStyle"]}>
              {faceList.map((face, i) => (
                <MakerFaceButton
                  key={face.face}
                  face={face.face}
                  faceImage={facePath + face.image}
                  onClick={() => changeFace(face.face)}
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
