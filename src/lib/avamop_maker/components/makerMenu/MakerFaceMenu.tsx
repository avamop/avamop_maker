import React, { useState, useEffect, useContext } from "react";
import MakerFaceButton from "./MakerFaceButton";
import styles from "../../module-css/makerMenu/MakerFaceMenu.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import FaceListContext from "../../store/FaceListContext";
import FacePathContext from "../../store/FacePathContext";

const MakerFaceMenu: React.FC = () => {
  const faceList: FaceList[] = useContext(FaceListContext);
  console.log(faceList);
  const facePath: string = useContext(FacePathContext);

  const [showMenu, setShowMenu] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    left: "4px",
    top: "0px",
  });

  useEffect(() => {
    const updateButtonPosition = () => {
      setButtonPosition({
        left: `${window.innerWidth / 2}px`,
        top: `${window.innerHeight / 2}px`,
      });
    };

    window.addEventListener("resize", updateButtonPosition);
    updateButtonPosition();

    return () => window.removeEventListener("resize", updateButtonPosition);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {showMenu && (
        <ul
          className={styles["face-menu"]}
          style={{ position: "absolute", left: 400 }}
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
      <button
        style={{ display: "block", margin: "auto" }}
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? (
          <img
            src="https://static.wikia.nocookie.net/eb14885b-a435-4612-b6a7-31709c190614/scale-to-width/370"
            alt="Hide Faces"
            style={{ width: "100px", height: "100px" }}
          />
        ) : (
          <img
            src="https://static.wikia.nocookie.net/eb14885b-a435-4612-b6a7-31709c190614/scale-to-width/370"
            alt="Show Faces"
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </button>
    </div>
  );
};

export default React.memo(MakerFaceMenu);
