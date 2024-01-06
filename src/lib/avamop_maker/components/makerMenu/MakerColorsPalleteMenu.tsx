import React, { useContext, useState, useEffect } from "react";
import MakerColorsButton from "./MakerColorsButton";
import styles from "../../module-css/makerMenu/MakerColorsPallete.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // 追加: SwiperのCSSをインポート

import ColorsObjectContext from "../../store/ColorsObjectContext";

const MakerColorsPalleteMenu: React.FC = ({}) => {
  const [showSwiper, setShowSwiper] = useState(false);
  const [touchRatio, setTouchRatio] = useState(0); // touchRatioのstateを追加
  const colorsObject = useContext(ColorsObjectContext);

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
  console.log(colorsObjectSorted);

  // colors.jsonを非同期に読み込み、その要素数を取得
  useEffect(() => {
    fetch("/examples/colors.json")
      .then((response) => response.json())
      .then((json) => {
        const length = Object.keys(json).length; // 要素数を取得[^1^][1]
        setTouchRatio(length); // touchRatioを設定
      });
  }, []);

  return (
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
          {Object.keys(colorsObjectSorted).map((groupKey) => (
            <MakerColorsButton
              key={groupKey}
              colorCode={colorsObject[groupKey].hex}
              colorName={groupKey}
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
                  {colorsObjectSorted[groupKey].colorName.map((color) => (
                    <SwiperSlide key={color} style={{ width: "50px" }}>
                      <MakerColorsButton
                        key={color}
                        colorCode={colorsObject[color].hex}
                        colorName={color}
                      />
                    </SwiperSlide>
                  ))}
                </div>
              ))}
            </ul>
          </Swiper>
        </>
      )}
    </>
  );
};

export default MakerColorsPalleteMenu;
