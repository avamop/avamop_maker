import React, { useContext, useState, useRef, useEffect } from "react";
import MakerColorsButton from "./MakerColorsButton";
import * as styles from "../../module-css/makerMenu/MakerColorsPalleteMenu.module.css";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPeaceLoading, setIsPeaceLoading] = useState<boolean>(false);
  const [isSliderLoading, setIsSliderLoading] = useState<boolean>(false);
  const [saveColor, setSaveColor] = useState<SelectedColorValue | null>(null);
  const selectedPeaceButton = (value) => {
    const { colorGroup, partSplit } = value;
    setSelectedPartSplit(partSplit);
    setSelectedColorGroup(colorGroup);
  };
  const [afterSwitched, setAfterSwitched] = useState<boolean>(true);

  useEffect(() => {
    if (selectedCategory && selectedColorGroup && selectedPartSplit) {
      setIsSliderLoading(true);
      setAfterSwitched(true);
      const colorData = selectedParts.selectedColor[selectedColorGroup];
      const selectedColor = selectedParts.selectedColor;
      setColor(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].color
            : colorData["default"].color
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].color
          : selectedColor["none"]["default"].color
      );
      setHueReverse(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].hueReverse
            : colorData["default"].hueReverse
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].hueReverse
          : selectedColor["none"]["default"].hueReverse
      );
      setSaturationReverse(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].saturationReverse
            : colorData["default"].saturationReverse
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].saturationReverse
          : selectedColor["none"]["default"].saturationReverse
      );
      setHueGraph(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].hueGraph
            : colorData["default"].hueGraph
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].hueGraph
          : selectedColor["none"]["default"].hueGraph
      );
      setSaturationGraph(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].saturationGraph
            : colorData["default"].saturationGraph
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].saturationGraph
          : selectedColor["none"]["default"].saturationGraph
      );
      setValueGraph(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].valueGraph
            : colorData["default"].valueGraph
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].valueGraph
          : selectedColor["none"]["default"].valueGraph
      );
      setHueGlobalSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].hueGraph.globalSlope
            : colorData["default"].hueGraph.globalSlope
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].hueGraph.globalSlope
          : selectedColor["none"]["default"].hueGraph.globalSlope
      );
      setHueIndividualSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].hueGraph.individualSlope
            : colorData["default"].hueGraph.individualSlope
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].hueGraph.individualSlope
          : selectedColor["none"]["default"].hueGraph.individualSlope
      );
      setSaturationGlobalSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].saturationGraph.globalSlope
            : colorData["default"].saturationGraph.globalSlope
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].saturationGraph.globalSlope
          : selectedColor["none"]["default"].saturationGraph.globalSlope
      );
      setSaturationIndividualSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].saturationGraph.individualSlope
            : colorData["default"].saturationGraph.individualSlope
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].saturationGraph
              .individualSlope
          : selectedColor["none"]["default"].saturationGraph.individualSlope
      );
      setValueGlobalSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].valueGraph.globalSlope
            : colorData["default"].valueGraph.globalSlope
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].valueGraph.globalSlope
          : selectedColor["none"]["default"].valueGraph.globalSlope
      );
      setValueIndividualSlope(
        colorData
          ? colorData[selectedPartSplit]
            ? colorData[selectedPartSplit].valueGraph.individualSlope
            : colorData["default"].valueGraph.individualSlope
          : selectedColor["none"][selectedPartSplit]
          ? selectedColor["none"][selectedPartSplit].valueGraph.individualSlope
          : selectedColor["none"]["default"].valueGraph.individualSlope
      );
      setIsSliderLoading(false);
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
    // console.log(changeHue);
    setAfterSwitched(false);
    setHueGlobalSlope(changeHue);
    // }
  };

  const changeSaturationGlobalSlope = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // if (isPressed) {
    let changeSaturation = Number(event.target.value);
    // console.log(changeSaturation);
    setAfterSwitched(false);
    setSaturationGlobalSlope(changeSaturation);
    // }
  };

  const changeValueGlobalSlope = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let changeValue = Number(event.target.value);
    // console.log(changeValue);
    setAfterSwitched(false);
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
    setIsPeaceLoading(true);
    const peaceValuesColorGroup: string[] = [];
    const peaceValuesPartSplit: string[] = [];
    if (selectedCategory) {
      if (enableChain) {
        for (const value in colorMenuPartIcons[selectedCategory].true) {
          peaceValuesColorGroup.push(
            colorMenuPartIcons[selectedCategory].true[value].colorGroup
          );
          peaceValuesPartSplit.push(
            colorMenuPartIcons[selectedCategory].true[value].partSplit
          );
        }
      } else {
        for (const value in colorMenuPartIcons[selectedCategory].false) {
          peaceValuesColorGroup.push(
            colorMenuPartIcons[selectedCategory].false[value].colorGroup
          );
          peaceValuesPartSplit.push(
            colorMenuPartIcons[selectedCategory].false[value].partSplit
          );
        }
      }
      const tmpSelectedColorGroup = selectedParts.category[selectedCategory]
        .partName
        ? enableChain
          ? colorMenuPartIcons[selectedCategory].true.some(
              (item) => item.colorGroup === selectedColorGroup
            )
            ? selectedColorGroup
            : colorMenuPartIcons[selectedCategory].true[0].colorGroup
          : colorMenuPartIcons[selectedCategory].false.some(
              (item) => item.colorGroup === selectedColorGroup
            )
          ? selectedColorGroup
          : colorMenuPartIcons[selectedCategory].false[0].colorGroup
        : null;
      const tmpSelectedPartSplit = selectedParts.category[selectedCategory]
        .partName
        ? enableChain
          ? colorMenuPartIcons[selectedCategory].true.some(
              (item) => item.partSplit === selectedPartSplit
            )
            ? selectedPartSplit
            : colorMenuPartIcons[selectedCategory].true[0].partSplit
          : colorMenuPartIcons[selectedCategory].false.some(
              (item) => item.partSplit === selectedPartSplit
            )
          ? selectedPartSplit
          : colorMenuPartIcons[selectedCategory].false[0].partSplit
        : null;
      setSelectedPartSplit(tmpSelectedPartSplit);
      setSelectedColorGroup(tmpSelectedColorGroup);
    }
    setIsPeaceLoading(false);
  }, [selectedCategory, enableChain, colorMenuPartIcons]);

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
        !selectedPartSplit ||
        afterSwitched
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
            className={styles["colorShowButton"]}
            onClick={() => setShowSwiper(!showSwiper)}
          >
            {showSwiper ? (
              <img
                className={styles["swiperColorImage"]}
                src={`/pallete.png`}
                alt="Hide Face"
              />
            ) : (
              <img
                className={styles["swiperColorImage"]}
                src={`/pallete.png`}
                alt="Show Face"
              />
            )}
          </button>
          {showSwiper && (
            <>
              {!selectedColorGroup ||
              !selectedPartSplit ||
              isSliderLoading ? null : (
                <div
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchEnd={handleMouseUp}
                >
                  <button
                    className={styles["settingButton"]}
                    name="hueReverse"
                    id="hueReverse"
                    onClick={() => {
                      setAfterSwitched(false);
                      setHueReverse(!hueReverse);
                    }}
                  >
                    {hueReverse ? "色調反転 ON" : "色調反転 OFF"}
                  </button>
                  <button
                    className={styles["settingButton"]}
                    name="saturationReverse"
                    id="saturationReverse"
                    onClick={() => {
                      setAfterSwitched(false);
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
                    className={styles["scrollBarSwiper"]}
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
                        value={hueGlobalSlope}
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
                        value={saturationGlobalSlope}
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
                        value={valueGlobalSlope}
                        id="valueRange"
                        onChange={changeValueGlobalSlope}
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              )}
              <button
                className={styles["settingButton"]}
                name="enableChain"
                id="enableChain"
                onClick={() =>
                  setSaveColor(
                    selectedParts.selectedColor[selectedColorGroup][
                      selectedPartSplit
                    ]
                  )
                }
              >
                {"色の保存"}
              </button>
              {saveColor ? (
                <button
                  className={styles["settingButton"]}
                  name="enableChain"
                  id="enableChain"
                  onClick={() => {
                    setColor(saveColor.color);
                    setHueReverse(saveColor.hueReverse);
                    setSaturationReverse(saveColor.saturationReverse);
                    setHueGlobalSlope(saveColor.hueGraph.globalSlope);
                    setHueIndividualSlope(saveColor.hueGraph.individualSlope);
                    setSaturationGlobalSlope(
                      saveColor.saturationGraph.globalSlope
                    );
                    setSaturationIndividualSlope(
                      saveColor.saturationGraph.individualSlope
                    );
                    setValueGlobalSlope(saveColor.valueGraph.globalSlope);
                    setValueIndividualSlope(
                      saveColor.valueGraph.individualSlope
                    );
                  }}
                >
                  {"保存した色の使用"}
                </button>
              ) : null}
              <button
                className={styles["settingButton"]}
                name="enableChain"
                id="enableChain"
                onClick={() => {
                  setAfterSwitched(false);
                  setEnableChain(!enableChain);
                }}
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
                className={styles["scrollBarSwiper"]}
                slidesPerView="auto"
                spaceBetween={0}
                touchRatio={touchRatio / 300}
                mousewheel={false}
              >
                {isPeaceLoading
                  ? null
                  : enableChain
                  ? colorMenuPartIcons[selectedCategory].true.map(
                      (index, i) => {
                        return (
                          <SwiperSlide key={i} style={{ width: "100px" }}>
                            <div
                              onClick={() =>
                                selectedPeaceButton({
                                  colorGroup: index.colorGroup,
                                  partSplit: index.partSplit,
                                })
                              }
                            >
                              <img
                                className={`
                                ${styles["partsImg"]}
                                ${
                                  index.colorGroup === selectedColorGroup &&
                                  index.partSplit === selectedPartSplit
                                    ? styles["partsImgSelected"]
                                    : ""
                                }
                              `}
                                src={index.image}
                                alt={
                                  selectedParts.category[selectedCategory]
                                    ? selectedParts.category[selectedCategory]
                                        .partName
                                    : ""
                                }
                              />
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )
                  : colorMenuPartIcons[selectedCategory].false.map(
                      (index, i) => {
                        return (
                          <SwiperSlide key={i} style={{ width: "100px" }}>
                            <div
                              onClick={() =>
                                selectedPeaceButton({
                                  colorGroup: index.colorGroup,
                                  partSplit: index.partSplit,
                                })
                              }
                            >
                              <img
                                className={`${styles["partsImg"]}
                                ${
                                  index.colorGroup === selectedColorGroup &&
                                  index.partSplit === selectedPartSplit
                                    ? styles["partsImgSelected"]
                                    : ""
                                }
                              `}
                                src={index.image}
                                alt={
                                  selectedParts.category[selectedCategory]
                                    ? selectedParts.category[selectedCategory]
                                        .partName
                                    : ""
                                }
                              />
                            </div>
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
                    className={styles["scrollBarSwiper"]}
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
                          onClick={() => {
                            setAfterSwitched(false);
                            setColor(groupKey);
                          }}
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
                    className={styles["scrollBarSwiper"]}
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
                                  onClick={() => {
                                    setAfterSwitched(false);
                                    setColor(color);
                                  }}
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
