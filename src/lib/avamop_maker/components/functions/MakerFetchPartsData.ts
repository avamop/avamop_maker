import { MakerConvertPartList } from "./MakerConvertPartList";
import { MakerCombinePartIcon } from "./MakerCombinePartIcon";
import { MakerConvertPartsJimp } from "./MakerConvertPartsJimp";

export const MakerFetchPartsData = async (
  partObject: PartObjectMerged,
  path: string,
  setMenuPartIcon: (menuPartIconList: CombinePartIconsObjectBase64) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  try {
    const partObjectJimp: Promise<PartObjectJimp> = MakerConvertPartsJimp(
      partObject,
      path + "parts/"
    );
    const partObjectForCombine = MakerConvertPartList(await partObjectJimp);
    const menuPartIconList: CombinePartIconsObjectBase64 = {};
    for (const category in partObjectForCombine) {
      menuPartIconList[category] = {
        partList: {},
      };
      for (const item in partObjectForCombine[category].partList) {
        const partList: CombinePartIconsCategoryBase64 = {
          bodyType: partObjectForCombine[category].partList[item].bodyType,
          faces: await MakerCombinePartIcon(
            partObjectForCombine[category].partList[item].peaces
          ),
        };
        menuPartIconList[category].partList[item] = partList;
      }
    }
    setMenuPartIcon(menuPartIconList);
    setIsLoading(false); // データの読み込みが完了したらisLoadingをfalseに設定
  } catch (error) {
    console.log("データ読み込みエラー:", error);
    setIsLoading(false); // エラーが発生した場合もisLoadingをfalseに設定
  }
};
