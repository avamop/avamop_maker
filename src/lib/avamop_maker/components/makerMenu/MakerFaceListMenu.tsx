import React, { useContext } from "react";
import MakerFaceButton from "./MakerFaceButton";
import FaceListContext from "../../store/FaceListContext";
import SelectedPartsContext from "../../store/SelectedPartsContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import MenuPartIconsContext from "../../store/MenuPartIconsContext";
import PartsObjectContext from "../../store/PartsObjectContext";

interface MakerFaceListMenuProps {
  category: string;
  item: string;
}

const MakerFaceListMenu: React.FC<MakerFaceListMenuProps> = ({
  category,
  item,
}) => {
  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);
  const { menuPartIcons, setMenuPartIcons } = useContext(MenuPartIconsContext);

  const changeFace = (face: string) => {
    setSelectedParts({
      ...selectedParts,
      bodyType: selectedParts.bodyType,
      face: face,
      category: selectedParts.category,
      selectedColor: selectedParts.selectedColor, //選択されている色のオブジェクト
      selectedFace: {
        ...selectedParts.selectedFace,
        [category]: face,
      },
    });
  };

  return (
    <Swiper slidesPerView="auto" freeMode={true} spaceBetween={0}>
      <ul>
        {Object.keys(menuPartIcons[category].partList[item].faces).map(
          (face) => (
            <SwiperSlide key={face}>
              <MakerFaceButton
                face={face}
                // 表情のサムネイルを用意する予定
                faceImage={
                  menuPartIcons[category].partList[item].faces[face].imagePath
                }
                onClick={() => changeFace(face)}
              />
            </SwiperSlide>
          )
        )}
      </ul>
    </Swiper>
  );
};
export default React.memo(MakerFaceListMenu);
