import React, { useContext, useState, useRef, useEffect } from "react";
import MakerColorsButton from "./MakerColorsButton";
import styles from "../../module-css/makerMenu/MakerColorsPallete.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // 追加: SwiperのCSSをインポート
import ColorsObjectContext from "../../store/ColorsObjectContext";
import SelectedPartsContext from "../../store/SelectedPartsContext";
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
import MakerFaceMenu from "./MakerFaceMenu";

declare const Jimp: JimpObject;

const MakerColorsPalleteMenu: React.FC = ({}) => {
  const [showSwiper, setShowSwiper] = useState(false);
  const [touchRatio, setTouchRatio] = useState(0); // touchRatioのstateを追加
  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);
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
  const [hueReverse, setHueReverse] = useState<boolean>(null);
  const [saturationReverse, setSaturationReverse] = useState<boolean>(null);
  const [hueGraph, setHueGraph] = useState<ColorGraph>(null);
  const [saturationGraph, setSaturationGraph] = useState<ColorGraph>(null);
  const [valueGraph, setValueGraph] = useState<ColorGraph>(null);
  const [hueGlobalSlope, setHueGlobalSlope] = useState<number>(null);
  const [saturationGlobalSlope, setSaturationGlobalSlope] =
    useState<number>(null);
  const [valueGlobalSlope, setValueGlobalSlope] = useState<number>(null);
  const nullImage: JimpType = useContext(NullImageContext);
  const [isLoading, setIsLoading] = useState(false);

  const selectedRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(event.target.value);
    const { colorGroup, partSplit } = JSON.parse(event.target.value);
    setSelectedColorGroup(colorGroup);
    setSelectedPartSplit(partSplit);
    setHueReverse(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .hueReverse
          : selectedParts.selectedColor[selectedColorGroup]["default"]
              .hueReverse
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit].hueReverse
        : selectedParts.selectedColor["none"]["default"].hueReverse
    );
    setSaturationReverse(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .saturationReverse
          : selectedParts.selectedColor[selectedColorGroup]["default"]
              .saturationReverse
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit]
            .saturationReverse
        : selectedParts.selectedColor["none"]["default"].saturationReverse
    );
    setHueGraph(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .hueGraph
          : selectedParts.selectedColor[selectedColorGroup]["default"].hueGraph
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit].hueGraph
        : selectedParts.selectedColor["none"]["default"].hueGraph
    );
    setSaturationGraph(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .saturationGraph
          : selectedParts.selectedColor[selectedColorGroup]["default"]
              .saturationGraph
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit].saturationGraph
        : selectedParts.selectedColor["none"]["default"].saturationGraph
    );
    setValueGraph(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .valueGraph
          : selectedParts.selectedColor[selectedColorGroup]["default"]
              .valueGraph
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit].valueGraph
        : selectedParts.selectedColor["none"]["default"].valueGraph
    );
  };

  const [isPressed, setIsPressed] = React.useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const changeHueGlobalScope = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (isPressed) {
    let changeHue = Number(event.target.value);
    // console.log(changeHue);
    setHueGlobalSlope(changeHue);
    setHueGraph({
      globalSlope: hueGlobalSlope,
      individualSlope: hueGraph.individualSlope,
    });
    handleChange(null, null, null, hueGraph, null, null);
    // }
  };

  const changeSaturationGlobalScope = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if (isPressed) {
    let changeSaturation = Number(event.target.value);
    // console.log(changeSaturation);
    setSaturationGlobalSlope(changeSaturation);
    setSaturationGraph({
      globalSlope: saturationGlobalSlope,
      individualSlope: saturationGraph.individualSlope,
    });
    handleChange(null, null, null, null, saturationGraph, null);
    // }
  };

  const changeValueGlobalScope = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if (isPressed) {
    let changeValue = Number(event.target.value);
    // console.log(changeValue);
    setValueGlobalSlope(changeValue);
    setValueGraph({
      globalSlope: valueGlobalSlope,
      individualSlope: valueGraph.individualSlope,
    });
    handleChange(null, null, null, null, null, valueGraph);
    // }
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
    setHueReverse(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .hueReverse
          : selectedParts.selectedColor[selectedColorGroup]["default"]
              .hueReverse
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit].hueReverse
        : selectedParts.selectedColor["none"]["default"].hueReverse
    );
    setSaturationReverse(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .saturationReverse
          : selectedParts.selectedColor[selectedColorGroup]["default"]
              .saturationReverse
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit]
            .saturationReverse
        : selectedParts.selectedColor["none"]["default"].saturationReverse
    );
    setHueGraph(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .hueGraph
          : selectedParts.selectedColor[selectedColorGroup]["default"].hueGraph
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit].hueGraph
        : selectedParts.selectedColor["none"]["default"].hueGraph
    );
    setSaturationGraph(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .saturationGraph
          : selectedParts.selectedColor[selectedColorGroup]["default"]
              .saturationGraph
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit].saturationGraph
        : selectedParts.selectedColor["none"]["default"].saturationGraph
    );
    setValueGraph(
      selectedParts.selectedColor[selectedColorGroup]
        ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
          ? selectedParts.selectedColor[selectedColorGroup][selectedPartSplit]
              .valueGraph
          : selectedParts.selectedColor[selectedColorGroup]["default"]
              .valueGraph
        : selectedParts.selectedColor["none"][selectedPartSplit]
        ? selectedParts.selectedColor["none"][selectedPartSplit].valueGraph
        : selectedParts.selectedColor["none"]["default"].valueGraph
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
  const handleChange = async (
    color: string | null,
    hueReverse: boolean | null,
    saturationReverse: boolean | null,
    hueGraph: ColorGraph | null,
    saturationGraph: ColorGraph | null,
    valueGraph: ColorGraph | null
  ) => {
    if (isLoading) return; // 非同期関数が実行中の場合、ここで処理を終了します。

    setIsLoading(true); // 非同期関数の実行を開始します。

    try {
      const updateSelectedParts = MakerChangingColorsObject(
        selectedParts,
        setSelectedParts,
        selectedColorGroup,
        selectedPartSplit,
        enableChain,
        color,
        hueReverse,
        saturationReverse,
        hueGraph,
        saturationGraph,
        valueGraph,
        selectedCategory,
        partsObject
      );
      if (updateSelectedParts === null) {
        return;
      }
      MakerChangingColor(
        updateSelectedParts,
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
  
  const [swiper, setSwiper] = useState(null);
  const scrollSpeed = 1; // スクロール速度を調整します
  
  useEffect(() => {
    if (swiper !== null && swiper.el !== undefined) {
      const handleWheel = (event) => {
        if (event.deltaY === 0) return;
        event.preventDefault();
        swiper.el.scrollLeft += event.deltaY * scrollSpeed;
      };
      swiper.el.addEventListener('wheel', handleWheel);
      return () => swiper.el.removeEventListener('wheel', handleWheel);
    }
  }, [swiper]);  
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
                src={`/pallete.png`}
                alt="Hide Face"
              />
            ) : (
              <img
                className={styles["swiper-color-image"]}
                src={`/pallete.png`}
                alt="Show Face"
              />
            )}
          </button>
          {showSwiper && (
            <>
              {!selectedColorGroup || !selectedPartSplit ? null : (
                <div
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchEnd={handleMouseUp}
                >
                  <button
                    className={styles["setting-button"]}
                    name="hueReverse"
                    id="hueReverse"
                    onClick={() => {
                      setHueReverse(!hueReverse);
                      handleChange(null, hueReverse, null, null, null, null);
                    }}
                  >
                    {hueReverse ? "Hue Reverse ON" : "Hue Reverse OFF"}
                  </button>
                  <button
                    className={styles["setting-button"]}
                    name="saturationReverse"
                    id="saturationReverse"
                    onClick={() => {
                      setSaturationReverse(!saturationReverse);
                      handleChange(
                        null,
                        null,
                        saturationReverse,
                        null,
                        null,
                        null
                      );
                    }}
                  >
                    {saturationReverse
                      ? "Saturation Reverse ON"
                      : "Saturation Reverse OFF"}
                  </button>
                  <Swiper
                    className={styles["scroll-bar-swiper"]}
                    slidesPerView="auto"
                    freeMode={true}
                    spaceBetween={0}
                    touchRatio={touchRatio / 100}
                  >
                    <SwiperSlide style={{ width: "150px" }}>
                      <label>H</label>
                      <input
                        type="range"
                        name="hueRange"
                        min="0"
                        max="32"
                        defaultValue={hueGraph.globalSlope}
                        id="hueRange"
                        onChange={changeHueGlobalScope}
                      />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "150px" }}>
                      <label>S</label>
                      <input
                        type="range"
                        name="saturationRange"
                        min="0"
                        max="48"
                        defaultValue={saturationGraph.globalSlope}
                        id="saturationRange"
                        onChange={changeSaturationGlobalScope}
                      />
                    </SwiperSlide>
                    <SwiperSlide style={{ width: "150px" }}>
                      <label>V</label>
                      <input
                        type="range"
                        name="valueRange"
                        min="0"
                        max="48"
                        defaultValue={valueGraph.globalSlope}
                        id="valueRange"
                        onChange={changeValueGlobalScope}
                      />
                    </SwiperSlide>
                  </Swiper>
                  <input
                    type="checkbox"
                    name="hueReverse"
                    id="hueReverse"
                    defaultChecked={hueReverse}
                    onChange={() => {
                      setHueReverse(hueReverse ? false : true);
                      handleChange(null, hueReverse, null, null, null, null);
                    }}
                  />
                  <input
                    type="checkbox"
                    name="saturationReverse"
                    id="saturationReverse"
                    defaultChecked={saturationReverse}
                    onChange={() => {
                      setSaturationReverse(saturationReverse ? false : true);
                      handleChange(
                        null,
                        null,
                        saturationReverse,
                        null,
                        null,
                        null
                      );
                    }}
                  />
                </div>
              )}
              <button
                className={styles["setting-button"]}
                name="enableChain"
                id="enableChain"
                onClick={() => setEnableChain(!enableChain)}
              >
                {enableChain ? "Separate Setting" : "Global Setting"}
              </button>
              <MakerFaceMenu />
                <Swiper
                  className={styles["scroll-bar-swiper"]}
                  slidesPerView="auto"
                  freeMode={true}
                  spaceBetween={0}
                  touchRatio={touchRatio / 300}
                >
                {enableChain
                  ? colorMenuPartIcons[selectedCategory].true.map(
                      (index, i) => {
                        return (
                          <SwiperSlide key={i} style={{ width: "100px" }}>
                            <img
                              className={styles["parts-img"]}
                              src={index.image}
                              alt={
                                selectedParts.category[selectedCategory]
                                  ? selectedParts.category[selectedCategory]
                                      .partName
                                  : ""
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
                          </SwiperSlide>
                        );
                      }
                    )
                  : colorMenuPartIcons[selectedCategory].false.map(
                      (index, i) => {
                        return (
                          <SwiperSlide key={i} style={{ width: "100px" }}>
                            <img
                              className={styles["parts-img"]}
                              src={index.image}
                              alt={
                                selectedParts.category[selectedCategory]
                                  ? selectedParts.category[selectedCategory]
                                      .partName
                                  : ""
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
                          </SwiperSlide>
                        );
                      }
                    )}
              </Swiper>
              {!selectedColorGroup || !selectedPartSplit ? null : (
                <div>
                  <Swiper
                    className={styles["scroll-bar-swiper"]}
                    slidesPerView="auto"
                    freeMode={true}
                    spaceBetween={0}
                    touchRatio={touchRatio / 300}
                  >
                    {Object.keys(colorsObjectSorted).map((groupKey) => (
                      <SwiperSlide key={groupKey} style={{ width: "50px" }}>
                        <MakerColorsButton
                          key={groupKey}
                          colorCode={colorsObject[groupKey].hex}
                          colorName={groupKey}
                          isLoading={isLoading}
                          onClick={() =>
                            handleChange(groupKey, null, null, null, null, null)
                          }
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Swiper
                    onSwiper={(swiperInstance) => {
                      if (swiperInstance && swiperInstance !== swiper) {
                        setSwiper(swiperInstance);
                      }
                    }}
                    className={styles["scroll-bar-swiper"]}
                    slidesPerView="auto"
                    spaceBetween={0}
                    touchRatio={touchRatio / 20}
                    mousewheel={false}
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
                                      handleChange(
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
                                    handleChange(
                                      color,
                                      null,
                                      null,
                                      null,
                                      null,
                                      null
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
