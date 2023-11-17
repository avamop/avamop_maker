import { MakerConvertPartList } from "./MakerConvertPartList";
import { MakerSplitCombine } from "./MakerSplitCombine";

export const MakerFetchPartsData = async (
  partObject: PartObjectMerged,
  path: string,
  setMenuPartIconCache: (menuPartIconList: PartObjectBase64) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  try {
    const convertPartObject = MakerConvertPartList(partObject);
    const menuPartIconList: PartObjectBase64 = {};
    for (const category in convertPartObject) {
      menuPartIconList[category] = {
        partList: {},
      };
      for (const item in convertPartObject[category].partList) {
        const partList: CategoryItemsBase64 = {
          bodyType: convertPartObject[category].partList[item].bodyType,
          faces: await MakerSplitCombine(
            convertPartObject[category].partList[item].peaces,
            path + "parts/"
          ),
        };
        menuPartIconList[category].partList[item] = partList;
      }
    }
    setMenuPartIconCache(menuPartIconList);
    setIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
  } catch (error) {
    console.log("データ読み込みエラー:", error);
    setIsLoading(false); // エラーが発生した場合もisLoadingをfalseに設定
  }
};
