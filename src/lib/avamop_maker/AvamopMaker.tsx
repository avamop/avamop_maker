import { useEffect, useState } from "react";
import MakerWindow from "./components/MakerWindow";
import * as styles from "./module-css/makerMenu/AvamopMaker.module.css";
import PartsObjectContext from "./store/PartsObjectContext";
import NullImageContext from "./store/NullImageContext";
import "jimp/browser/lib/jimp";
import { JimpObject, JimpType } from "./types/jimp";
import { MakerConvertPartsJimp } from "./components/functions/imageProcess/MakerConvertPartsJimp";
import { MakerConvertPartsToMenuIcons } from "./components/functions/imageProcess/MakerConvertPartsToMenuIcons";
import PartsObjectJimpContext from "./store/PartsObjectJimpContext";
import PartsPathContext from "./store/PartsPathContext";
import MenuPartIconsContext from "./store/MenuPartIconsContext";
import SelectedCategoryContext from "./store/SelectedCategoryContext";
import FaceListContext from "./store/FaceListContext";
import FacePresetsContext from "./store/facePresetsContext";
import ViewScaleContext from "./store/ViewScaleContext";
import WindowWidthContext from "./store/WindowWidthContext";
import { MakerSelectedPartsGen } from "./components/functions/fetchData/MakerSelectedPartsGen";
import SelectedPartsContext from "./store/SelectedPartsContext";
import ColorsObjectContext from "./store/ColorsObjectContext";
import { MakerFaceGen } from "./components/functions/fetchData/MakerFaceGen";
import { MakerCanvasSelectedPartsGen } from "./components/functions/fetchData/MakerCanvasSelectedPartsGen";
import SelectedPartsForCanvasContext from "./store/SelectedPartsForCanvasContext";
import { MakerLayerCombineParts } from "./components/functions/imageProcess/MakerLayerCombineParts";
import CanvasImageContext from "./store/CanvasImageContext";
import FacePathContext from "./store/FacePathContext";
import { MakerConvertBase64 } from "./components/functions/imageProcess/MakerConvertBase64";
import { MakerGroupingParts } from "./components/functions/imageProcess/MakerGroupingParts";
import ColorMenuPartIconsContext from "./store/ColorMenuPartIconsContext";
import { MakerPartIconsTrim } from "./components/functions/imageProcess/MakerPartIconsTrim";

declare const Jimp: JimpObject;

export interface AvamopMakerProps {
  partsPath: string;
  facePath: string;
  partsObject: PartsObjectSplit;
  colorsObject: ColorsObject;
  defaultColors: DefaultColors;
  defaultAvaters?: SelectedParts;
  facePresets: FaceTree;
  nullImagePath: string;
}

const AvamopMaker: React.FC<AvamopMakerProps> = ({
  partsPath,
  facePath,
  partsObject,
  colorsObject,
  defaultColors,
  defaultAvaters,
  facePresets,
  nullImagePath,
}) => {
  if (window !== undefined) {
    const [nullImage, setNullImage] = useState<JimpType>();
    const [partsObjectJimp, setPartsObjectJimp] = useState<PartsObjectJimp>();
    const [menuPartIcons, setMenuPartIcons] = useState<MenuPartIconsBase64>();
    const [colorMenuPartIcons, setColorMenuPartIcons] =
      useState<ColorMenuPartIcons>();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [selectedParts, setSelectedParts] = useState<SelectedParts>(
      defaultAvaters
        ? defaultAvaters
        : MakerSelectedPartsGen(partsObject, defaultColors)
    );
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [viewScale, setViewScale] = useState<number>(
      windowWidth < 480 ? 1 : 2
    );
    const [selectedPartsForCanvas, setSelectedPartsForCanvas] =
      useState<SelectedPartsForCanvas>();

    const [nullImageIsLoading, setNullImageIsLoading] = useState<boolean>(true);
    const [partsObjectJimpIsLoading, setPartsObjectJimpIsLoading] =
      useState<boolean>(true);
    const [
      selectedPartsForCanvasIsLoading,
      setSelectedPartsForCanvasIsLoading,
    ] = useState<boolean>(true);
    const [menuPartIconsIsLoading, setMenuPartIconsIsLoading] =
      useState<boolean>(true);
    const [colorMenuPartIconsIsLoading, setColorMenuPartIconsIsLoading] =
      useState<boolean>(true);
    const [canvasImage, setCanvasImage] = useState<JimpType[]>();
    const faceList: FaceList[] = MakerFaceGen(facePresets);

    // console.log(faceList);
    useEffect(() => {
      const fetchNullImage = async () => {
        const tmpNullImage: JimpType = await Jimp.read(
          partsPath + nullImagePath
        );
        setNullImage(tmpNullImage);
        // console.log(tmpNullImage);
        setNullImageIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
      };
      fetchNullImage();
    }, []);

    useEffect(() => {
      const fetchPartsObjectJimp = async () => {
        if (
          !nullImageIsLoading &&
          nullImage != null &&
          partsObjectJimpIsLoading
        ) {
          const tmpPartsObjectJimp: PartsObjectJimp =
            await MakerConvertPartsJimp(
              partsObject,
              partsPath,
              nullImage,
              selectedParts,
              colorsObject
            );
          setPartsObjectJimp(tmpPartsObjectJimp);
          // console.log(tmpPartsObjectJimp);
          setPartsObjectJimpIsLoading(false);
        }
      };
      fetchPartsObjectJimp();
    }, [nullImageIsLoading, selectedParts]);

    useEffect(() => {
      const fetchMenuPartIcons = async () => {
        if (
          !partsObjectJimpIsLoading &&
          partsObjectJimp != null &&
          setMenuPartIconsIsLoading
        ) {
          const tmpMenuPartIcons: MenuPartIconsBase64 =
            await MakerConvertPartsToMenuIcons(partsObjectJimp);
          setMenuPartIcons(await tmpMenuPartIcons);
          // console.log(tmpMenuPartIcons);
          setMenuPartIconsIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
        }
      };
      fetchMenuPartIcons();
    }, [partsObjectJimpIsLoading]);

    useEffect(() => {
      const fetchSelectedPartsForCanvas = async () => {
        if (!partsObjectJimpIsLoading) {
          const tmpSelectedPartsForCanvas: SelectedPartsForCanvas =
            await MakerCanvasSelectedPartsGen(
              selectedParts,
              partsObjectJimp,
              nullImage
            );
          setSelectedPartsForCanvas(await tmpSelectedPartsForCanvas);
          // console.log(tmpSelectedPartsForCanvas);
          setSelectedPartsForCanvasIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
        }
      };
      fetchSelectedPartsForCanvas();
    }, [partsObjectJimpIsLoading, selectedParts, partsObjectJimp]);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setViewScale(windowWidth < 480 ? 1 : 2);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [window.innerWidth]);

    useEffect(() => {
      const imageGen = async () => {
        if (selectedPartsForCanvas != null) {
          const tmpCanvasImage: JimpType[] = await MakerLayerCombineParts(
            selectedPartsForCanvas
          );
          setCanvasImage(tmpCanvasImage);
        }
      };
      imageGen();
    }, [selectedPartsForCanvas]);

    useEffect(() => {
      const fetchColorMenuIcons = async () => {
        if (selectedPartsForCanvas != null) {
          const categories = Object.keys(selectedPartsForCanvas.category);
          const enableChainOptions = [true, false];
          let newImages: ColorMenuPartIcons = {};
          for (let selectedCategory of categories) {
            newImages[selectedCategory] = {
              true: [],
              false: [],
            };
            for (let enableChain of enableChainOptions) {
              if (enableChain) {
                const groupedParts = MakerGroupingParts(
                  selectedPartsForCanvas,
                  selectedCategory
                );
                const colorGroups = Object.keys(groupedParts);

                for (let colorGroup of colorGroups) {
                  let partSplits = groupedParts[colorGroup];
                  const images: { jimp: JimpType; partOrder: number }[] = [];
                  for (let i = 0; i < partSplits.length; i++) {
                    let partSplit = partSplits[i];
                    if (
                      partsObject[selectedCategory].partList[partSplit].items[
                        selectedParts.category[selectedCategory].partName
                      ]
                    ) {
                      if (
                        partsObject[selectedCategory].partList[partSplit].items[
                          selectedParts.category[selectedCategory].partName
                        ].faces
                      ) {
                        if (
                          partsObject[selectedCategory].partList[partSplit]
                            .items[
                            selectedParts.category[selectedCategory].partName
                          ].faces[selectedParts.selectedFace[selectedCategory]]
                        ) {
                          if (
                            selectedPartsForCanvas.category[selectedCategory]
                              .partSplit[partSplit].enableColor &&
                            partsObject[selectedCategory].partList[partSplit]
                              .items[
                              selectedParts.category[selectedCategory].partName
                            ].faces[
                              selectedParts.selectedFace[selectedCategory]
                            ].imagePath != null &&
                            partsObject[selectedCategory].partList[partSplit]
                              .items[
                              selectedParts.category[selectedCategory].partName
                            ].faces[
                              selectedParts.selectedFace[selectedCategory]
                            ].imagePath != "" &&
                            selectedPartsForCanvas.category[selectedCategory]
                              .partSplit[partSplit]
                          ) {
                            images.push({
                              jimp: selectedPartsForCanvas.category[
                                selectedCategory
                              ].partSplit[partSplit].partData.clone(),
                              partOrder:
                                selectedPartsForCanvas.category[
                                  selectedCategory
                                ].partSplit[partSplit].partOrder,
                            });
                          }
                        } else if (
                          selectedPartsForCanvas.category[selectedCategory]
                            .partSplit[partSplit].enableColor &&
                          partsObject[selectedCategory].partList[partSplit]
                            .items[
                            selectedParts.category[selectedCategory].partName
                          ].faces["clear"].imagePath != null &&
                          partsObject[selectedCategory].partList[partSplit]
                            .items[
                            selectedParts.category[selectedCategory].partName
                          ].faces["clear"].imagePath != "" &&
                          selectedPartsForCanvas.category[selectedCategory]
                            .partSplit[partSplit]
                        ) {
                          images.push({
                            jimp: selectedPartsForCanvas.category[
                              selectedCategory
                            ].partSplit[partSplit].partData.clone(),
                            partOrder:
                              selectedPartsForCanvas.category[selectedCategory]
                                .partSplit[partSplit].partOrder,
                          });
                        }
                      }
                    }
                  }
                  if (images.length > 0) {
                    images.sort((a, b) => a.partOrder - b.partOrder);
                    let image: JimpType = images[0].jimp;
                    for (let i = 1; i < images.length; i++) {
                      image = image.composite(images[i].jimp, 0, 0);
                    }
                    const imageBase64: string = await MakerConvertBase64(
                      await MakerPartIconsTrim(image, 64)
                    );
                    newImages[selectedCategory]["true"].push({
                      image: imageBase64,
                      colorGroup,
                      partSplit: "default",
                    });
                  }
                }
              } else {
                const partSplits = Object.keys(
                  selectedPartsForCanvas.category[selectedCategory].partSplit
                );
                for (let partSplit of partSplits) {
                  if (
                    partsObject[selectedCategory].partList[partSplit].items[
                      selectedParts.category[selectedCategory].partName
                    ]
                  ) {
                    if (
                      partsObject[selectedCategory].partList[partSplit].items[
                        selectedParts.category[selectedCategory].partName
                      ].faces
                    ) {
                      if (
                        partsObject[selectedCategory].partList[partSplit].items[
                          selectedParts.category[selectedCategory].partName
                        ].faces[selectedParts.selectedFace[selectedCategory]]
                      ) {
                        if (
                          selectedPartsForCanvas.category[selectedCategory]
                            .partSplit[partSplit].enableColor &&
                          partsObject[selectedCategory].partList[partSplit]
                            .items[
                            selectedParts.category[selectedCategory].partName
                          ].faces[selectedParts.selectedFace[selectedCategory]]
                            .imagePath != null &&
                          partsObject[selectedCategory].partList[partSplit]
                            .items[
                            selectedParts.category[selectedCategory].partName
                          ].faces[selectedParts.selectedFace[selectedCategory]]
                            .imagePath != "" &&
                          selectedPartsForCanvas.category[selectedCategory]
                            .partSplit[partSplit]
                        ) {
                          const image = await MakerConvertBase64(
                            await MakerPartIconsTrim(
                              selectedPartsForCanvas.category[
                                selectedCategory
                              ].partSplit[partSplit].partData.clone(),
                              64
                            )
                          );
                          newImages[selectedCategory]["false"].push({
                            image,
                            colorGroup:
                              selectedPartsForCanvas.category[selectedCategory]
                                .partSplit[partSplit].colorGroup,
                            partSplit,
                          });
                        }
                      } else {
                        if (
                          selectedPartsForCanvas.category[selectedCategory]
                            .partSplit[partSplit].enableColor &&
                          partsObject[selectedCategory].partList[partSplit]
                            .items[
                            selectedParts.category[selectedCategory].partName
                          ].faces["clear"].imagePath != null &&
                          partsObject[selectedCategory].partList[partSplit]
                            .items[
                            selectedParts.category[selectedCategory].partName
                          ].faces["clear"].imagePath != "" &&
                          selectedPartsForCanvas.category[selectedCategory]
                            .partSplit[partSplit]
                        ) {
                          const image = await MakerConvertBase64(
                            await MakerPartIconsTrim(
                              selectedPartsForCanvas.category[
                                selectedCategory
                              ].partSplit[partSplit].partData.clone(),
                              64
                            )
                          );
                          newImages[selectedCategory]["false"].push({
                            image,
                            colorGroup:
                              selectedPartsForCanvas.category[selectedCategory]
                                .partSplit[partSplit].colorGroup,
                            partSplit,
                          });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          setColorMenuPartIcons(newImages);
          setColorMenuPartIconsIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
        }
      };
      fetchColorMenuIcons();
    }, [selectedPartsForCanvas]);

    return (
      <>
        <div className={styles["windowStyle"]}>
          {/* 画像データのロードが終わったら中身を表示する */}
          {nullImageIsLoading ||
          partsObjectJimpIsLoading ||
          menuPartIconsIsLoading ||
          colorMenuPartIconsIsLoading ||
          selectedPartsForCanvasIsLoading ? (
            <div className={styles["loading"]}></div>
          ) : (
            <PartsPathContext.Provider value={partsPath}>
              <FacePathContext.Provider value={facePath}>
                <PartsObjectContext.Provider value={partsObject}>
                  <NullImageContext.Provider value={nullImage}>
                    <PartsObjectJimpContext.Provider
                      value={{ partsObjectJimp, setPartsObjectJimp }}
                    >
                      <MenuPartIconsContext.Provider
                        value={{ menuPartIcons, setMenuPartIcons }}
                      >
                        <ColorMenuPartIconsContext.Provider
                          value={colorMenuPartIcons}
                        >
                          <SelectedCategoryContext.Provider
                            value={{ selectedCategory, setSelectedCategory }}
                          >
                            <ColorsObjectContext.Provider value={colorsObject}>
                              <FaceListContext.Provider value={faceList}>
                                <FacePresetsContext.Provider
                                  value={facePresets}
                                >
                                  <SelectedPartsContext.Provider
                                    value={{ selectedParts, setSelectedParts }}
                                  >
                                    <SelectedPartsForCanvasContext.Provider
                                      value={{
                                        selectedPartsForCanvas,
                                        setSelectedPartsForCanvas,
                                      }}
                                    >
                                      <WindowWidthContext.Provider
                                        value={windowWidth}
                                      >
                                        <ViewScaleContext.Provider
                                          value={viewScale}
                                        >
                                          <CanvasImageContext.Provider
                                            value={{
                                              canvasImage,
                                              setCanvasImage,
                                            }}
                                          >
                                            {/*アバターメーカーの枠*/}
                                            <MakerWindow />
                                          </CanvasImageContext.Provider>
                                        </ViewScaleContext.Provider>
                                      </WindowWidthContext.Provider>
                                    </SelectedPartsForCanvasContext.Provider>
                                  </SelectedPartsContext.Provider>
                                </FacePresetsContext.Provider>
                              </FaceListContext.Provider>
                            </ColorsObjectContext.Provider>
                          </SelectedCategoryContext.Provider>
                        </ColorMenuPartIconsContext.Provider>
                      </MenuPartIconsContext.Provider>
                    </PartsObjectJimpContext.Provider>
                  </NullImageContext.Provider>
                </PartsObjectContext.Provider>
              </FacePathContext.Provider>
            </PartsPathContext.Provider>
          )}
        </div>
      </>
    );
  } else {
    console.error("avamop_maker can't use on server side");
  }
};

export default AvamopMaker;
