import React, { useContext, useState, useEffect } from "react";
import MakerColorsButton from "./MakerColorsButton";
import styles from "../../module-css/makerMenu/MakerColorsPallete.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // 追加: SwiperのCSSをインポート
import ColorsObjectContext from "../../store/ColorsObjectContext";
import SelectedPartsContext from "../../store/SelectedPartsContext";
import SelectedPartsForCanvasContext from "../../store/SelectedPartsForCanvasContext";
import PartsObjectContext from "../../store/PartsObjectContext";
import SelectedCategoryContext from "../../store/SelectedCategoryContext";
import { MakerConvertBase64 } from "../functions/imageProcess/MakerConvertBase64";
import { MakerGroupingParts } from "../functions/imageProcess/MakerGroupingParts";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerChangingColor } from "../functions/fetchData/MakerChangingColor";
import ColorMenuPartIconsContext from "../../store/ColorMenuPartIconsContext";
import PartsObjectJimpContext from "../../store/PartsObjectJimpContext";

const MakerColorsPalleteMenu: React.FC = ({}) => {
  const [showSwiper, setShowSwiper] = useState(false);
  const [touchRatio, setTouchRatio] = useState(0); // touchRatioのstateを追加
  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);
  const { selectedPartsForCanvas, setSelectedPartsForCanvas } = useContext(
    SelectedPartsForCanvasContext
  );
  const partsObject = useContext(PartsObjectContext);
  const { partsObjectJimp, setPartsObjectJimp } = useContext(
    PartsObjectJimpContext
  );
  const colorsObject = useContext(ColorsObjectContext);
  const { selectedCategory, setSelectedCategory } = useContext(
    SelectedCategoryContext
  );
  const colorMenuPartIcons = useContext(ColorMenuPartIconsContext);
  const [selectedColorGroup, setSelectedColorGroup] = useState<null | string>(
    null
  );
  const [selectedPartSplit, setSelectedPartSplit] = useState<null | string>(
    null
  );

  const selectedRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { colorGroup, partSplit } = JSON.parse(event.target.value);
    setSelectedColorGroup(colorGroup);
    setSelectedPartSplit(partSplit);
  };
  let enableChain = true;

  useEffect(() => {
    setSelectedColorGroup(null);
    setSelectedPartSplit(null);
    enableChain = true;
  }, [selectedCategory]);

  const colorsObjectSort = (colorsObject: ColorsObject): ColorsObjectSorted => {
    const groups: ColorsObjectSorted = {};
    for (const color in colorsObject) {
      const group = colorsObject[color].group;
      if (!groups[group]) {
        groups[group] = {
          colorName: [],
          parentColor: colorsObject[color].group,
        };
      }
      groups[group].colorName.push(color);
    }
    return groups;
  };

  const colorsObjectSorted: ColorsObjectSorted = colorsObjectSort(colorsObject);
  // console.log(colorsObjectSorted);

  // colors.jsonを非同期に読み込み、その要素数を取得
  useEffect(() => {
    fetch("/examples/colors.json")
      .then((response) => response.json())
      .then((json) => {
        const length = Object.keys(json).length; // 要素数を取得[^1^][1]
        setTouchRatio(length); // touchRatioを設定
      });
  }, []);
  console.log(colorMenuPartIcons);

  return (
    <>
      {!selectedCategory ? null : (
        <>
          <button
            className={styles["color-show-button"]}
            onClick={() => setShowSwiper(!showSwiper)}
          >
            {showSwiper ? (
              <img
                className={styles["swiper-color-image"]}
                src="../../../../../examples/assets/provisionals/provisionalclose.png"
                alt="Hide Face"
              />
            ) : (
              <img
                className={styles["swiper-color-image"]}
                src="../../../../../examples/assets/provisionals/provisionalopen.png"
                alt="Show Face"
              />
            )}
          </button>
          {showSwiper && (
            <>
              <input
                type="checkbox"
                name="enableChain"
                id="enableChain"
                defaultChecked={enableChain}
              />
              {enableChain
                ? colorMenuPartIcons[selectedCategory].true.map((index) => (
                    <>
                      <img
                        className={styles["parts-img"]}
                        src={index.image}
                        alt={selectedParts.category[selectedCategory].partName}
                      />
                      <input
                        type="radio"
                        name="colorMenu"
                        value={JSON.stringify({
                          colorGroup: index.colorGroup,
                          partSplit: "default",
                        })}
                        onChange={selectedRadio}
                      />
                    </>
                  ))
                : colorMenuPartIcons[selectedCategory].false.map((index) => (
                    <>
                      <img
                        className={styles["parts-img"]}
                        src={index.image}
                        alt={selectedParts.category[selectedCategory].partName}
                      />
                      <input
                        type="radio"
                        name="colorMenu"
                        value={JSON.stringify({
                          colorGroup: index.colorGroup,
                          partSplit: index.partSplit,
                        })}
                        onChange={selectedRadio}
                      />
                    </>
                  ))}
              {!selectedColorGroup || !selectedPartSplit ? null : (
                <>
                  {Object.keys(colorsObjectSorted).map((groupKey) => (
                    <MakerColorsButton
                      key={groupKey}
                      colorCode={colorsObject[groupKey].hex}
                      colorName={groupKey}
                      onClick={() =>
                        MakerChangingColor(
                          selectedParts,
                          setSelectedParts,
                          selectedColorGroup,
                          selectedPartSplit,
                          enableChain,
                          groupKey,
                          selectedCategory,
                          selectedParts.category[selectedCategory].partName,
                          partsObject,
                          partsObjectJimp,
                          setPartsObjectJimp
                        )
                      }
                    />
                  ))}
                  <Swiper
                    className={styles["scroll-bar-swiper"]}
                    slidesPerView="auto"
                    freeMode={true}
                    spaceBetween={0}
                    touchRatio={touchRatio / 20}
                  >
                    <ul>
                      {Object.keys(colorsObjectSorted).map((groupKey) => (
                        <div key={groupKey}>
                          {colorsObjectSorted[groupKey].colorName.map(
                            (color) => (
                              <SwiperSlide
                                key={color}
                                style={{ width: "50px" }}
                              >
                                <MakerColorsButton
                                  key={color}
                                  colorCode={colorsObject[color].hex}
                                  colorName={color}
                                  onClick={() =>
                                    MakerChangingColor(
                                      selectedParts,
                                      setSelectedParts,
                                      selectedColorGroup,
                                      selectedPartSplit,
                                      enableChain,
                                      color,
                                      selectedCategory,
                                      selectedParts.category[selectedCategory]
                                        .partName,
                                      partsObject,
                                      partsObjectJimp,
                                      setPartsObjectJimp
                                    )
                                  }
                                />
                              </SwiperSlide>
                            )
                          )}
                        </div>
                      ))}
                    </ul>
                  </Swiper>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MakerColorsPalleteMenu;
