import React, { useContext } from "react";
import MakerFaceButton from "./MakerFaceButton";
import SelectedPartsContext from "../../store/SelectedPartsContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import MenuPartIconsContext from "../../store/MenuPartIconsContext";

interface MakerFaceListMenuProps {
  category: string | null;
  item: string | null;
}

const MakerPartsFaceMenu: React.FC<MakerFaceListMenuProps> = ({
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
    <>
      {category !== null &&
      item !== null &&
      menuPartIcons[category].partList[item] ? (
        <Swiper
          style={{ display: "flex" }}
          slidesPerView={"auto"}
          freeMode={true}
          spaceBetween={0}
        >
          <ul>
            {Object.keys(menuPartIcons[category].partList[item].faces).map(
              (face) => (
                <SwiperSlide key={face} style={{ width: "150px" }}>
                  {" "}
                  {/* ここでスライドの幅を設定します */}
                  <MakerFaceButton
                    face={face}
                    // 表情のサムネイルを用意する予定
                    faceImage={
                      menuPartIcons[category].partList[item].faces[face]
                        .imagePath
                    }
                    onClick={() => changeFace(face)}
                  />
                </SwiperSlide>
              )
            )}
          </ul>
        </Swiper>
      ) : null}
    </>
  );
};
export default React.memo(MakerPartsFaceMenu);
