import { useEffect, useState } from "react";
import MakerWindow from "./components/MakerWindow";
import PartsObjectContext from "./store/PartsObjectContext";
import NullImageContext from "./store/NullImageContext";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerConvertPartsJimp } from "./components/functions/objectProcess/MakerConvertPartsJimp";
import { MakerConvertPartsToMenuIcons } from "./components/functions/imageProcess/MakerConvertPartsToMenuIcons";
import PartsObjectJimpContext from "./store/PartsObjectJimpContext";
import AssetsPathContext from "./store/AssetsPathContext";
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
interface AvamopMakerProps {
  path: string;
  partsObject: PartsObjectSplit;
  colorsObject: ColorsObject;
  defaultColors: DefaultColors;
  facePresets: faceTree;
  nullImagePath: string;
}

const AvamopMaker: React.FC<AvamopMakerProps> = ({
  path,
  partsObject,
  colorsObject,
  defaultColors,
  facePresets,
  nullImagePath,
}) => {
  const [nullImage, setNullImage] = useState<Jimp | null>(null);
  const [partsObjectJimp, setPartsObjectJimp] =
    useState<PartsObjectJimp | null>(null);
  const [menuPartIcons, setMenuPartIcons] =
    useState<CombinePartIconsObjectBase64 | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<SelectedParts>(
    MakerSelectedPartsGen(partsObject, defaultColors)
  );
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [viewScale, setViewScale] = useState<number>(windowWidth < 480 ? 1 : 2);
  const [selectedPartsForCanvas, setSelectedPartsForCanvas] =
    useState<SelectedPartsForCanvas>(null);

  const [nullImageIsLoading, setNullImageIsLoading] = useState<boolean>(true);
  const [partsObjectJimpIsLoading, setPartsObjectJimpIsLoading] =
    useState<boolean>(true);
  const [selectedPartsForCanvasIsLoading, setSelectedPartsForCanvasIsLoading] =
    useState<boolean>(true);
  const [menuPartsIconsIsLoading, setMenuPartsIconsIsLoading] =
    useState<boolean>(true);
  const faceList: string[] = MakerFaceGen(facePresets);
  faceList.push("custom");

  useEffect(() => {
    const fetchNullImage = async () => {
      const tmpNullImage: Jimp = await Jimp.read(path + nullImagePath);
      setNullImage(tmpNullImage);
      // console.log(tmpNullImage);
      setNullImageIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
    };
    fetchNullImage();
  }, []);

  useEffect(() => {
    const fetchPartsObjectJimp = async () => {
      if (!nullImageIsLoading && nullImage != null) {
        const tmpPartsObjectJimp: PartsObjectJimp = await MakerConvertPartsJimp(
          partsObject,
          path,
          nullImage
        );
        setPartsObjectJimp(tmpPartsObjectJimp);
        // console.log(tmpPartsObjectJimp);
        setPartsObjectJimpIsLoading(false);
      }
    };
    fetchPartsObjectJimp();
  }, [nullImageIsLoading]);

  useEffect(() => {
    const fetchMenuPartIcons = async () => {
      if (!partsObjectJimpIsLoading && partsObjectJimp != null) {
        const tmpMenuPartIcons: CombinePartIconsObjectBase64 =
          await MakerConvertPartsToMenuIcons(partsObjectJimp);
        setMenuPartIcons(await tmpMenuPartIcons);
        // console.log(tmpMenuPartIcons);
        setMenuPartsIconsIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
      }
    };
    fetchMenuPartIcons();
  }, [partsObjectJimpIsLoading]);

  useEffect(() => {
    const fetchSelectedPartsForCanvas = async () => {
      if (!partsObjectJimpIsLoading && partsObjectJimp != null) {
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
  }, [partsObjectJimpIsLoading, selectedParts]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setViewScale(windowWidth < 480 ? 1 : 2);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <>
      <AssetsPathContext.Provider value={path}>
        <PartsObjectContext.Provider value={partsObject}>
          <NullImageContext.Provider value={nullImage}>
            <PartsObjectJimpContext.Provider value={partsObjectJimp}>
              <MenuPartIconsContext.Provider value={menuPartIcons}>
                <SelectedCategoryContext.Provider
                  value={{ selectedCategory, setSelectedCategory }}
                >
                  <ColorsObjectContext.Provider value={colorsObject}>
                    <FaceListContext.Provider value={faceList}>
                      <FacePresetsContext.Provider value={facePresets}>
                        <SelectedPartsContext.Provider
                          value={{ selectedParts, setSelectedParts }}
                        >
                          <SelectedPartsForCanvasContext.Provider
                            value={{
                              selectedPartsForCanvas,
                              setSelectedPartsForCanvas,
                            }}
                          >
                            <WindowWidthContext.Provider value={windowWidth}>
                              <ViewScaleContext.Provider value={viewScale}>
                                {/* 画像データのロードが終わったら中身を表示する */}
                                {nullImageIsLoading ||
                                partsObjectJimpIsLoading ||
                                menuPartsIconsIsLoading ||
                                selectedPartsForCanvasIsLoading ? (
                                  <div>loading...</div>
                                ) : (
                                  /*アバターメーカーの枠*/
                                  <MakerWindow />
                                )}
                              </ViewScaleContext.Provider>
                            </WindowWidthContext.Provider>
                          </SelectedPartsForCanvasContext.Provider>
                        </SelectedPartsContext.Provider>
                      </FacePresetsContext.Provider>
                    </FaceListContext.Provider>
                  </ColorsObjectContext.Provider>
                </SelectedCategoryContext.Provider>
              </MenuPartIconsContext.Provider>
            </PartsObjectJimpContext.Provider>
          </NullImageContext.Provider>
        </PartsObjectContext.Provider>
      </AssetsPathContext.Provider>
    </>
  );
};

export { AvamopMaker };
