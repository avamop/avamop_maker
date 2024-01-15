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
import "jimp/browser/lib/jimp";
import { JimpObject, JimpType } from "../../types/jimp";
import { MakerChangingColorsObject } from "../functions/fetchData/MakerChangingColorsObject";
import ColorMenuPartIconsContext from "../../store/ColorMenuPartIconsContext";
import PartsObjectJimpContext from "../../store/PartsObjectJimpContext";
import PartsPathContext from "../../store/PartsPathContext";
import MenuPartIconsContext from "../../store/MenuPartIconsContext";
import NullImageContext from "../../store/NullImageContext";
import { MakerChangingColor } from "../functions/fetchData/MakerChangingColor";

declare const Jimp: JimpObject;

const MakerColorsPalleteMenu: React.FC = ({}) => {
  const [showSwiper, setShowSwiper] = useState(false);
  const [touchRatio, setTouchRatio] = useState(0); // touchRatioのstateを追加
  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);
  const { selectedPartsForCanvas, setSelectedPartsForCanvas } = useContext(
    SelectedPartsForCanvasContext
  );
  const partsPath = useContext(PartsPathContext);
  const partsObject = useContext(PartsObjectContext);
  const { partsObjectJimp, setPartsObjectJimp } = useContext(
    PartsObjectJimpContext
  );
  const colorsObject = useContext(ColorsObjectContext);
  const { selectedCategory, setSelectedCategory } = useContext(
    SelectedCategoryContext
  );
  const { menuPartIcons, setMenuPartIcons } = useContext(MenuPartIconsContext);
  const colorMenuPartIcons = useContext(ColorMenuPartIconsContext);
  const [selectedRadioValue, setSelectedRadioValue] = useState<null | string>(
    null
  );
  const [selectedColorGroup, setSelectedColorGroup] = useState<null | string>(
    null
  );
  const [selectedPartSplit, setSelectedPartSplit] = useState<null | string>(
    null
  );
  const [enableChain, setEnableChain] = useState<boolean>(true);
  const nullImage: JimpType = useContext(NullImageContext);
  const [isLoading, setIsLoading] = useState(false);

  const selectedCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableChain(enableChain ? false : true);
  };

  const selectedRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(event.target.value);
    const { colorGroup, partSplit } = JSON.parse(event.target.value);
    setSelectedColorGroup(colorGroup);
    setSelectedPartSplit(partSplit);
  };

  useEffect(() => {
    const radioValuesColorGroup: string[] = [];
    const radioValuesPartSplit: string[] = [];
    if (selectedCategory) {
      if (enableChain) {
        for (const value in colorMenuPartIcons[selectedCategory].true) {
          radioValuesColorGroup.push(
            colorMenuPartIcons[selectedCategory].true[value].colorGroup
          );
          radioValuesPartSplit.push("default");
        }
      } else {
        for (const value in colorMenuPartIcons[selectedCategory].false) {
          radioValuesColorGroup.push(
            colorMenuPartIcons[selectedCategory].false[value].colorGroup
          );
          radioValuesPartSplit.push(
            colorMenuPartIcons[selectedCategory].false[value].partSplit
          );
        }
      }
    }
    setSelectedRadioValue(
      JSON.stringify({
        colorGroup: radioValuesColorGroup[0],
        partSplit: radioValuesPartSplit[0],
      })
      // null
    );
    setSelectedColorGroup(
      radioValuesColorGroup[0]
      // null
    );
    setSelectedPartSplit(
      radioValuesPartSplit[0]
      // null
    );
    setEnableChain(enableChain);
  }, [selectedCategory, enableChain]);

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
  // console.log(colorMenuPartIcons);

  const handleClick = async (
    selectedParts: SelectedParts,
    setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
    selectedColorGroup: string,
    selectedPartSplit: string,
    enableChain: boolean,
    color: string,
    selectedCategory: string,
    partsObject: PartsObjectSplit,
    partsObjectJimp: PartsObjectJimp,
    setPartsObjectJimp: React.Dispatch<React.SetStateAction<PartsObjectJimp>>,
    colorsObject: ColorsObject,
    partsPath: string,
    menuPartIcons: CombinePartIconsObjectBase64,
    setMenuPartIcons: React.Dispatch<
      React.SetStateAction<CombinePartIconsObjectBase64>
    >,
    nullImage: JimpType
  ) => {
    if (isLoading) return; // 非同期関数が実行中の場合、ここで処理を終了します。

    setIsLoading(true); // 非同期関数の実行を開始します。

    try {
      MakerChangingColorsObject(
        selectedParts,
        setSelectedParts,
        selectedColorGroup,
        selectedPartSplit,
        enableChain,
        color,
        null,
        null,
        null,
        null,
        null,
        selectedCategory,
        partsObject
      );
      await MakerChangingColor(
        selectedParts,
        selectedColorGroup,
        selectedPartSplit,
        enableChain,
        selectedCategory,
        partsObject,
        partsObjectJimp,
        setPartsObjectJimp,
        colorsObject,
        partsPath,
        menuPartIcons,
        setMenuPartIcons,
        nullImage
      );
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false); // 非同期関数の実行が完了したら、状態を更新します。
  };

  return (
    <>
      {!selectedCategory ? null : (
        <>
          <button
            className={styles["colorbutton"]}
            onClick={() => setShowSwiper(!showSwiper)}
          ></button>
          {showSwiper && (
            <>
              <input
                type="checkbox"
                name="enableChain"
                id="enableChain"
                defaultChecked={enableChain}
                onChange={selectedCheck}
              />
              {enableChain
                ? colorMenuPartIcons[selectedCategory].true.map((index, i) => {
                    return (
                      <div key={i}>
                        <img
                          className={styles["parts-img"]}
                          src={index.image}
                          alt={
                            selectedParts.category[selectedCategory].partName
                          }
                        />
                        <input
                          type="radio"
                          name="colorMenu"
                          value={JSON.stringify({
                            colorGroup: index.colorGroup,
                            partSplit: "default",
                          })}
                          checked={
                            selectedRadioValue ===
                            JSON.stringify({
                              colorGroup: index.colorGroup,
                              partSplit: "default",
                            })
                          }
                          onChange={selectedRadio}
                        />
                      </div>
                    );
                  })
                : colorMenuPartIcons[selectedCategory].false.map((index, i) => {
                    return (
                      <div key={i}>
                        <img
                          className={styles["parts-img"]}
                          src={index.image}
                          alt={
                            selectedParts.category[selectedCategory].partName
                          }
                        />
                        <input
                          type="radio"
                          name="colorMenu"
                          value={JSON.stringify({
                            colorGroup: index.colorGroup,
                            partSplit: index.partSplit,
                          })}
                          checked={
                            selectedRadioValue ===
                            JSON.stringify({
                              colorGroup: index.colorGroup,
                              partSplit: index.partSplit,
                            })
                          }
                          onChange={selectedRadio}
                        />
                      </div>
                    );
                  })}
              {!selectedColorGroup || !selectedPartSplit ? null : (
                <div>
                  <Swiper
                    className={styles["scroll-bar-swiper"]}
                    slidesPerView="auto"
                    freeMode={true}
                    spaceBetween={0}
                    touchRatio={touchRatio / 10000}
                  >
                  {Object.keys(colorsObjectSorted).map((groupKey) => (
                              <SwiperSlide
                                key={groupKey}
                                style={{ width: "50px" }}
                              >
                                <MakerColorsButton
                                  key={groupKey}
                                  colorCode={colorsObject[groupKey].hex}
                                  colorName={groupKey}
                                  isLoading={isLoading}
                                  onClick={() =>
                                    handleClick(
                                      selectedParts,
                                      setSelectedParts,
                                      selectedColorGroup,
                                      selectedPartSplit,
                                      enableChain,
                                      groupKey,
                                      selectedCategory,
                                      partsObject,
                                      partsObjectJimp,
                                      setPartsObjectJimp,
                                      colorsObject,
                                      partsPath,
                                      menuPartIcons,
                                      setMenuPartIcons,
                                      nullImage
                                    )
                                  }
                                />
                              </SwiperSlide>
                  ))}
                  </Swiper>
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
                                  colorCode={colorsObject[color].hex}
                                  colorName={color}
                                  isLoading={isLoading}
                                  onClick={() =>
                                    handleClick(
                                      selectedParts,
                                      setSelectedParts,
                                      selectedColorGroup,
                                      selectedPartSplit,
                                      enableChain,
                                      color,
                                      selectedCategory,
                                      partsObject,
                                      partsObjectJimp,
                                      setPartsObjectJimp,
                                      colorsObject,
                                      partsPath,
                                      menuPartIcons,
                                      setMenuPartIcons,
                                      nullImage
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
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MakerColorsPalleteMenu;
