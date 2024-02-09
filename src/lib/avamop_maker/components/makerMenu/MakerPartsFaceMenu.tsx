import React, { useContext } from "react";
import MakerFaceButton from "./MakerFaceButton";
import SelectedPartsContext from "../../store/SelectedPartsContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import MenuPartIconsContext from "../../store/MenuPartIconsContext";

interface MakerFaceListMenuProps {
  category: string;
  item: string;
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
      selectedFace: {
        ...selectedParts.selectedFace,
        [category]: face,
      },
    });
  };

  return (
    <>
      {menuPartIcons[category].partList[item] ? (
        Object.keys(menuPartIcons[category].partList[item].faces).length > 1 ? (
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
        ) : null
      ) : null}
    </>
  );
};
export default React.memo(MakerPartsFaceMenu);
