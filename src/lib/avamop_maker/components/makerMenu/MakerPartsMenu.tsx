import React, { useContext, useEffect, useRef, useState } from "react";
import MakerPartsButton from "./MakerPartsButton";
import MakerPartsCategories from "./MakerPartsCategories";
import MakerChangingPart from "../functions/fetchData/MakerChangingPart";
import SelectedCategoryContext from "../../store/SelectedCategoryContext";
import SelectedPartsContext from "../../store/SelectedPartsContext";
import MenuPartIconsContext from "../../store/MenuPartIconsContext";
import PartsObjectContext from "../../store/PartsObjectContext";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../../module-css/makerMenu/MakerPartsMenu.module.css";
import MakerPartsFaceMenu from "./MakerPartsFaceMenu";

const MakerPartsMenu: React.FC = ({}) => {
  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);
  const { selectedCategory, setSelectedCategory } = useContext(
    SelectedCategoryContext
  );
  const partsObject = useContext(PartsObjectContext);
  const { menuPartIcons } = useContext(MenuPartIconsContext);
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  const swiperRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState<string>(null);

  useEffect(() => {
    if (selectedCategory === null) {
      setSelectedItem(null);
    } else if (!selectedParts.category[selectedCategory]) {
      setSelectedItem(null);
    } else {
      setSelectedItem(selectedParts.category[selectedCategory].partName);
    }
  }, [selectedParts, selectedCategory]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [selectedParts]);
  return (
    <>
      <Swiper
        ref={swiperRef}
        className={styles["scroll-bar-swiper"]}
        slidesPerView="auto"
        freeMode={true}
        spaceBetween={0}
        onSwiper={(swiper) => swiper.update()}
      >
        <ul>
          {Object.keys(selectedParts.category).map((category) => (
            <SwiperSlide key={category} style={{ width: "70px" }}>
              <MakerPartsCategories
                category={category}
                isSelected={selectedCategory === category}
                onClick={() => handleCategoryClick(category)}
                imageSrc={
                  selectedParts.category[category].partName
                    ? menuPartIcons[category].partList[
                        selectedParts.category[category].partName
                      ].faces[selectedParts.selectedFace[category]]
                      ? menuPartIcons[category].partList[
                          selectedParts.category[category].partName
                        ].faces[selectedParts.selectedFace[category]].imagePath
                      : menuPartIcons[category].partList[
                          selectedParts.category[category].partName
                        ].faces["clear"].imagePath
                    : menuPartIcons[category].partList[
                        Object.keys(menuPartIcons[category].partList)[0]
                      ].bodyType.includes(selectedParts.bodyType) ||
                      menuPartIcons[category].partList[
                        Object.keys(menuPartIcons[category].partList)[0]
                      ].bodyType === null
                    ? menuPartIcons[category].partList[
                        Object.keys(menuPartIcons[category].partList)[0]
                      ].faces[selectedParts.selectedFace[category]]
                      ? menuPartIcons[category].partList[
                          Object.keys(menuPartIcons[category].partList)[0]
                        ].faces[selectedParts.selectedFace[category]].imagePath
                      : menuPartIcons[category].partList[
                          Object.keys(menuPartIcons[category].partList)[0]
                        ].faces["clear"].imagePath
                    : menuPartIcons[category].partList[
                        Object.keys(menuPartIcons[category].partList).find(
                          (x) =>
                            menuPartIcons[category].partList[
                              x
                            ].bodyType.includes(selectedParts.bodyType)
                        )
                      ]
                    ? menuPartIcons[category].partList[
                        Object.keys(menuPartIcons[category].partList).find(
                          (x) =>
                            menuPartIcons[category].partList[
                              x
                            ].bodyType.includes(selectedParts.bodyType)
                        )
                      ].faces[selectedParts.selectedFace[category]]
                      ? menuPartIcons[category].partList[
                          Object.keys(menuPartIcons[category].partList).find(
                            (x) =>
                              menuPartIcons[category].partList[
                                x
                              ].bodyType.includes(selectedParts.bodyType)
                          )
                        ].faces[selectedParts.selectedFace[category]].imagePath
                      : menuPartIcons[category].partList[
                          Object.keys(menuPartIcons[category].partList).find(
                            (x) =>
                              menuPartIcons[category].partList[
                                x
                              ].bodyType.includes(selectedParts.bodyType)
                          )
                        ].faces["clear"].imagePath
                    : menuPartIcons[category].partList[
                        Object.keys(menuPartIcons[category].partList)[0]
                      ].faces[selectedParts.selectedFace[category]]
                    ? menuPartIcons[category].partList[
                        Object.keys(menuPartIcons[category].partList)[0]
                      ].faces[selectedParts.selectedFace[category]].imagePath
                    : menuPartIcons[category].partList[
                        Object.keys(menuPartIcons[category].partList)[0]
                      ].faces["clear"].imagePath
                }
              />
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>

      {Object.keys(selectedParts.category).map((category) =>
        selectedCategory === category
          ? Object.keys(menuPartIcons[category].partList).map((item) =>
              category === "body" ||
              menuPartIcons[category].partList[item].bodyType === null ||
              menuPartIcons[category].partList[item].bodyType.includes(
                selectedParts.bodyType
              ) ? (
                <MakerPartsButton
                  key={item}
                  item={item}
                  buttonImage={
                    menuPartIcons[category].partList[item].faces["clear"]
                      .imagePath
                  }
                  onClick={() =>
                    MakerChangingPart(
                      category,
                      menuPartIcons[category].partList[item].bodyType,
                      item,
                      selectedParts,
                      setSelectedParts,
                      partsObject
                    )
                  }
                />
              ) : null
            )
          : null
      )}
      <MakerPartsFaceMenu category={selectedCategory} item={selectedItem} />
    </>
  );
};

export default React.memo(MakerPartsMenu);
