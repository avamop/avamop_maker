import React, { useEffect, useRef } from "react";
import MakerPartsButton from "./MakerPartsButton";
import MakerPartsCategories from "./MakerPartsCategories";
import { MakerChangingPart } from "../functions/fetchData/MakerChangingPart";
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../../module-css/makerMenu/MakerPartsMenu.module.css'
interface MakerPartsMenuProps {
  selectedCategory: string | null;
  selectedFace: string;
  categoryIconObject: categoryIconObject;
  selectedParts: SelectedParts;
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>;
  handleCategoryClick: (category: string) => void;
  menuPartIcons: CombinePartIconsObjectBase64;
  isLoading: boolean;
}
const MakerPartsMenu: React.FC<MakerPartsMenuProps> = ({
  selectedCategory,
  selectedFace,
  categoryIconObject,
  handleCategoryClick,
  selectedParts,
  setSelectedParts,
  menuPartIcons,
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [selectedParts]);
  return (
    <>
    <Swiper
    className={Styles['scroll-bar-swiper']}
    slidesPerView='auto'
    freeMode={true}
    scrollbar={{ draggable: true }}
  >
    <ul>
        {/* カテゴリーの入ったオブジェクトの中身を展開したものからカテゴリーボタンを生成し、代入している */}
        {Object.keys(selectedParts.category).map((category) => (
          <SwiperSlide key={category} style={{ width: '70px' }}>
            <MakerPartsCategories
            category={category}
            isSelected={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
            imageSrc={
              categoryIconObject[category.replace(/_\d+$/, "")].imagePath
            }
          />
          </SwiperSlide>
          /* category.replace(/_\d+$/, "")はcategoryから連番を取り除いたもの */
        ))}
      </ul>
  </Swiper>
  
      {Object.keys(selectedParts.category).map((category) =>
        /* カテゴリーがbodyかどうかで代入する値が変化する */
        selectedCategory === category
          ? category === "body"
            ? Object.keys(
                menuPartIcons[category.replace(/_\d+$/, "")].partList
              ).map((item) => (
                // パーツアイコンオブジェクトの中身を展開したものをパーツボタンに代入している
                <MakerPartsButton
                  key={item}
                  item={item}
                  buttonImage={
                    menuPartIcons[category.replace(/_\d+$/, "")].partList[item]
                      .faces[selectedFace]
                      ? menuPartIcons[category.replace(/_\d+$/, "")].partList[
                          item
                        ].faces[selectedFace].imagePath
                      : menuPartIcons[category.replace(/_\d+$/, "")].partList[
                          item
                        ].faces["normal"].imagePath
                  }
                  // 選択した表情に合わせた画像がない場合はデフォルトの画像を出す
                  onClick={() =>
                    MakerChangingPart(
                      category,
                      menuPartIcons[category.replace(/_\d+$/, "")].partList[
                        item
                      ].bodyType,
                      item,
                      selectedParts,
                      setSelectedParts
                    )
                  }
                />
              ))
            : // bodyカテゴリじゃない場合のボタン
              Object.keys(
                menuPartIcons[category.replace(/_\d+$/, "")].partList
              ).map((item) =>
                menuPartIcons[category.replace(/_\d+$/, "")].partList[item]
                  .bodyType === null ||
                menuPartIcons[category.replace(/_\d+$/, "")].partList[
                  item
                ].bodyType.includes(selectedParts.bodyType) ? (
                  <MakerPartsButton
                    key={item}
                    item={item}
                    buttonImage={
                      menuPartIcons[category.replace(/_\d+$/, "")].partList[
                        item
                      ].faces[selectedFace]
                        ? menuPartIcons[category.replace(/_\d+$/, "")].partList[
                            item
                          ].faces[selectedFace].imagePath
                        : menuPartIcons[category.replace(/_\d+$/, "")].partList[
                            item
                          ].faces["normal"].imagePath
                    }
                    onClick={() =>
                      MakerChangingPart(
                        category,
                        menuPartIcons[category.replace(/_\d+$/, "")].partList[
                          item
                        ].bodyType,
                        item,
                        selectedParts,
                        setSelectedParts
                      )
                    }
                  />
                ) : null
              )
          : null
      )}
    </>
  );
};

export default React.memo(MakerPartsMenu);
