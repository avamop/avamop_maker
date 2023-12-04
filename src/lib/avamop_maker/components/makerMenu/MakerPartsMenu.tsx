import React from "react";
import MakerPartsButton from "./MakerPartsButton";
import MakerPartsCategories from "./MakerPartsCategories";
import { MakerChangingPart } from "../functions/fetchData/MakerChangingPart";
import { Swiper, SwiperSlide } from 'swiper/react'
interface MakerPartsMenuProps {
  selectedCategory: string | null;
  selectedFace: string;
  categoryIconObject: categoryIconObject;
  selectedParts: SelectedParts;
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>;
  handleCategoryClick: (category: string) => void;
  menuPartIcon: CombinePartIconsObjectBase64;
  isLoading: boolean;
}
const MakerPartsMenu: React.FC<MakerPartsMenuProps> = ({
  selectedCategory,
  selectedFace,
  categoryIconObject,
  handleCategoryClick,
  selectedParts,
  setSelectedParts,
  menuPartIcon,
}) => {
  
  return (
    <>
    <Swiper
    slidesPerView='auto'
    freeMode={true}
    scrollbar={{ draggable: true }}
  >
    <ul>
        {/* カテゴリーの入ったオブジェクトの中身を展開したものからカテゴリーボタンを生成し、代入している */}
        {Object.keys(selectedParts.category).map((category:string) => (
          <SwiperSlide>
            <MakerPartsCategories
            key={category}
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
                menuPartIcon[category.replace(/_\d+$/, "")].partList
              ).map((item) => (
                // パーツアイコンオブジェクトの中身を展開したものをパーツボタンに代入している
                <MakerPartsButton
                  key={item}
                  item={item}
                  buttonImage={
                    menuPartIcon[category.replace(/_\d+$/, "")].partList[item]
                      .faces[selectedFace]
                      ? menuPartIcon[category.replace(/_\d+$/, "")].partList[
                          item
                        ].faces[selectedFace].imagePath
                      : menuPartIcon[category.replace(/_\d+$/, "")].partList[
                          item
                        ].faces["normal"].imagePath
                  }
                  // 選択した表情に合わせた画像がない場合はデフォルトの画像を出す
                  onClick={() =>
                    MakerChangingPart(
                      category,
                      menuPartIcon[category.replace(/_\d+$/, "")].partList[item]
                        .bodyType,
                      item,
                      selectedParts,
                      setSelectedParts
                    )
                  }
                />
              ))
            : // bodyカテゴリじゃない場合のボタン
              Object.keys(
                menuPartIcon[category.replace(/_\d+$/, "")].partList
              ).map((item) =>
                menuPartIcon[category.replace(/_\d+$/, "")].partList[item]
                  .bodyType === null ||
                menuPartIcon[category.replace(/_\d+$/, "")].partList[
                  item
                ].bodyType.includes(selectedParts.bodyType) ? (
                  <MakerPartsButton
                    key={item}
                    item={item}
                    buttonImage={
                      menuPartIcon[category.replace(/_\d+$/, "")].partList[item]
                        .faces[selectedFace]
                        ? menuPartIcon[category.replace(/_\d+$/, "")].partList[
                            item
                          ].faces[selectedFace].imagePath
                        : menuPartIcon[category.replace(/_\d+$/, "")].partList[
                            item
                          ].faces["normal"].imagePath
                    }
                    onClick={() =>
                      MakerChangingPart(
                        category,
                        menuPartIcon[category.replace(/_\d+$/, "")].partList[
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
