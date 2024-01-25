import React, { useContext, useState, useRef, useEffect } from "react";
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
  const [color, setColor] = useState<string>(null);
  const [hueReverse, setHueReverse] = useState<boolean>(null);
  const [saturationReverse, setSaturationReverse] = useState<boolean>(null);
  const [hueGraph, setHueGraph] = useState<ColorGraph>(null);
  const [saturationGraph, setSaturationGraph] = useState<ColorGraph>(null);
  const [valueGraph, setValueGraph] = useState<ColorGraph>(null);
  const [hueGlobalSlope, setHueGlobalSlope] = useState<number>(null);
  const [saturationGlobalSlope, setSaturationGlobalSlope] =
    useState<number>(null);
  const [valueGlobalSlope, setValueGlobalSlope] = useState<number>(null);
  const [hueIndividualSlope, setHueIndividualSlope] =
    useState<AtLeast<10, number>>(null);
  const [saturationIndividualSlope, setSaturationIndividualSlope] =
    useState<AtLeast<10, number>>(null);
  const [valueIndividualSlope, setValueIndividualSlope] =
    useState<AtLeast<10, number>>(null);
  const nullImage: JimpType = useContext(NullImageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isRadioLoading, setIsRadioLoading] = useState(false);

  const selectedRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(event.target.value);
    const { colorGroup, partSplit } = JSON.parse(event.target.value);
    setSelectedColorGroup(colorGroup);
    setSelectedPartSplit(partSplit);
  };

  useEffect(() => {
    if (selectedCategory && selectedColorGroup && selectedPartSplit) {
      const colorData = selectedParts.selectedColor[selectedColorGroup];
      setColor(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].color
            : colorData["default"].color
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit].color
          : selectedParts.selectedColor["none"]["default"].color
      );
      setHueReverse(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].hueReverse
            : colorData["default"].hueReverse
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit].hueReverse
          : selectedParts.selectedColor["none"]["default"].hueReverse
      );
      setSaturationReverse(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].saturationReverse
            : colorData["default"].saturationReverse
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit]
              .saturationReverse
          : selectedParts.selectedColor["none"]["default"].saturationReverse
      );
      setHueGraph(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].hueGraph
            : colorData["default"].hueGraph
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit].hueGraph
          : selectedParts.selectedColor["none"]["default"].hueGraph
      );
      setSaturationGraph(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].saturationGraph
            : colorData["default"].saturationGraph
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit]
              .saturationGraph
          : selectedParts.selectedColor["none"]["default"].saturationGraph
      );
      setValueGraph(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].valueGraph
            : colorData["default"].valueGraph
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit].valueGraph
          : selectedParts.selectedColor["none"]["default"].valueGraph
      );
      setHueGlobalSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].hueGraph.globalSlope
            : colorData["default"].hueGraph.globalSlope
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit].hueGraph
              .globalSlope
          : selectedParts.selectedColor["none"]["default"].hueGraph.globalSlope
      );
      setHueIndividualSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].hueGraph.individualSlope
            : colorData["default"].hueGraph.individualSlope
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit].hueGraph
              .individualSlope
          : selectedParts.selectedColor["none"]["default"].hueGraph
              .individualSlope
      );
      setSaturationGlobalSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].saturationGraph.globalSlope
            : colorData["default"].saturationGraph.globalSlope
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit]
              .saturationGraph.globalSlope
          : selectedParts.selectedColor["none"]["default"].saturationGraph
              .globalSlope
      );
      setSaturationIndividualSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].saturationGraph.individualSlope
            : colorData["default"].saturationGraph.individualSlope
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit]
              .saturationGraph.individualSlope
          : selectedParts.selectedColor["none"]["default"].saturationGraph
              .individualSlope
      );
      setValueGlobalSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].valueGraph.globalSlope
            : colorData["default"].valueGraph.globalSlope
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit].valueGraph
              .globalSlope
          : selectedParts.selectedColor["none"]["default"].valueGraph
              .globalSlope
      );
      setValueIndividualSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].valueGraph.individualSlope
            : colorData["default"].valueGraph.individualSlope
          : selectedParts.selectedColor["none"][selectedPartSplit]
          ? selectedParts.selectedColor["none"][selectedPartSplit].valueGraph
              .individualSlope
          : selectedParts.selectedColor["none"]["default"].valueGraph
              .individualSlope
      );
    }
  }, [selectedColorGroup, selectedPartSplit]);

  const [isPressed, setIsPressed] = React.useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const changeHueGlobalSlope = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (isPressed) {
    let changeHue = Number(event.target.value);
    console.log(changeHue);
    setHueGlobalSlope(changeHue);
    // }
  };

  const changeSaturationGlobalSlope = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if (isPressed) {
    let changeSaturation = Number(event.target.value);
    console.log(changeSaturation);
    setSaturationGlobalSlope(changeSaturation);
    // }
  };

  const changeValueGlobalSlope = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let changeValue = Number(event.target.value);
    console.log(changeValue);
    setValueGlobalSlope(changeValue);
  };

  useEffect(() => {
    setHueGraph({
      globalSlope: hueGlobalSlope,
      individualSlope: hueIndividualSlope,
    });
  }, [hueGlobalSlope, hueIndividualSlope]);

  useEffect(() => {
    setSaturationGraph({
      globalSlope: saturationGlobalSlope,
      individualSlope: saturationIndividualSlope,
    });
  }, [saturationGlobalSlope, saturationIndividualSlope]);

  useEffect(() => {
    setValueGraph({
      globalSlope: valueGlobalSlope,
      individualSlope: valueIndividualSlope,
    });
  }, [valueGlobalSlope, valueIndividualSlope]);

  useEffect(() => {
    setIsRadioLoading(true);
    const radioValuesColorGroup: string[] = [];
    const radioValuesPartSplit: string[] = [];
    if (selectedCategory) {
      if (enableChain) {
        for (const value in colorMenuPartIcons[selectedCategory].true) {
          radioValuesColorGroup.push(
            colorMenuPartIcons[selectedCategory].true[value].colorGroup
          );
          radioValuesPartSplit.push(
            colorMenuPartIcons[selectedCategory].true[value].partSplit
          );
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
    setIsRadioLoading(false);
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
  useEffect(() => {
    const handleChange = async () => {
      if (
        isLoading ||
        !selectedCategory ||
        !selectedColorGroup ||
        !selectedPartSplit
      )
        return; // 非同期関数が実行中の場合、ここで処理を終了します。
      setIsLoading(true); // 非同期関数の実行を開始します。
      try {
        MakerChangingColor(
          MakerChangingColorsObject(
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
          ),
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
    handleChange(); // 非同期関数を実行します。
  }, [
    color,
    hueReverse,
    saturationReverse,
    hueGraph,
    saturationGraph,
    valueGraph,
  ]);

  const [swiper, setSwiper] = useState(null);
  const scrollSpeed = 1; // スクロール速度を調整します

  useEffect(() => {
    if (swiper !== null && swiper.el !== undefined) {
      const handleWheel = (event) => {
        if (event.deltaY === 0) return;
        event.preventDefault();
        swiper.el.scrollLeft += event.deltaY * scrollSpeed;
      };
      swiper.el.addEventListener("wheel", handleWheel);
      return () => {
        // swiper.elの存在を再確認
        if (swiper !== null && swiper.el !== undefined) {
          swiper.el.removeEventListener("wheel", handleWheel);
        }
      };
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
                    }}
                  >
                    {hueReverse ? "色調反転 ON" : "色調反転 OFF"}
                  </button>
                  <button
                    className={styles["setting-button"]}
                    name="saturationReverse"
                    id="saturationReverse"
                    onClick={() => {
                      setSaturationReverse(!saturationReverse);
                    }}
                  >
                    {saturationReverse ? "彩度反転 ON" : "彩度反転 OFF"}
                  </button>
                  <Swiper
                    onSwiper={(swiperInstance) => {
                      if (swiperInstance && swiperInstance !== swiper) {
                        setSwiper(swiperInstance);
                      }
                    }}
                    className={styles["scroll-bar-swiper"]}
                    slidesPerView="auto"
                    spaceBetween={0}
                    touchRatio={touchRatio / 100}
                    mousewheel={false}
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
                        onChange={changeHueGlobalSlope}
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
                        onChange={changeSaturationGlobalSlope}
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
                        onChange={changeValueGlobalSlope}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              )}
              <button
                className={styles["setting-button"]}
                name="enableChain"
                id="enableChain"
                onClick={() => setEnableChain(!enableChain)}
              >
                {enableChain ? "個別設定" : "全体設定"}
              </button>
              <MakerFaceMenu />
              <Swiper
                onSwiper={(swiperInstance) => {
                  if (swiperInstance && swiperInstance !== swiper) {
                    setSwiper(swiperInstance);
                  }
                }}
                className={styles["scroll-bar-swiper"]}
                slidesPerView="auto"
                spaceBetween={0}
                touchRatio={touchRatio / 300}
                mousewheel={false}
              >
                {isRadioLoading
                  ? null
                  : enableChain
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
                    onSwiper={(swiperInstance) => {
                      if (swiperInstance && swiperInstance !== swiper) {
                        setSwiper(swiperInstance);
                      }
                    }}
                    className={styles["scroll-bar-swiper"]}
                    slidesPerView="auto"
                    spaceBetween={0}
                    touchRatio={touchRatio / 300}
                    mousewheel={false}
                  >
                    {Object.keys(colorsObjectSorted).map((groupKey) => (
                      <SwiperSlide key={groupKey} style={{ width: "50px" }}>
                        <MakerColorsButton
                          key={groupKey}
                          colorCode={colorsObject[groupKey].hex}
                          colorName={groupKey}
                          isLoading={isLoading}
                          onClick={() => setColor(groupKey)}
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
                    simulateTouch={false}
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
                                  onClick={() => setColor(color)}
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
