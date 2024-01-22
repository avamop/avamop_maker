import React, { useContext } from "react";
import MakerFaceButton from "./MakerFaceButton";
import FaceListContext from "../../store/FaceListContext";
import SelectedPartsContext from "../../store/SelectedPartsContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const MakerFaceListMenu: React.FC = () => {
  const faceList = useContext(FaceListContext);
  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);

  const changeFace = (face: string) => {
    let newSelectedFace = { ...selectedParts.selectedFace };
    Object.keys(selectedParts.category).forEach((key) => {
      newSelectedFace[key] = face;
    });
    setSelectedParts({
      ...selectedParts,
      bodyType: selectedParts.bodyType,
      face: face,
      category: selectedParts.category,
      selectedColor: selectedParts.selectedColor, //選択されている色のオブジェクト
      selectedFace: newSelectedFace,
    });
  };

  return (
    <Swiper
      slidesPerView="auto"
      freeMode={true}
      spaceBetween={0}
    >
      <ul>
        {faceList.map((face) => (
          <SwiperSlide>
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
  );
};
export default React.memo(MakerFaceListMenu);
