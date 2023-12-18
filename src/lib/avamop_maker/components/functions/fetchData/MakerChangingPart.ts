import { MakerSearchIgnoreTrigger } from "./MakerSearchIgnoreTrigger";

export const MakerChangingPart = (
  category: string,
  bodyTypeValue: string[],
  partNameValue: string,
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  partsObject: PartsObjectSplit
) => {
  try {
    //bodyの値が正常かどうかを判定する
    let updateAvaters: SelectedParts = {
      bodyType: category === "body" ? partNameValue : selectedParts.bodyType,
      face: selectedParts.face,
      category: {
        ...selectedParts.category,
        [category]: {
          ...selectedParts.category[category],
          partName: partNameValue,
          partFlip: selectedParts.category[category].partFlip,
        },
      },
      selectedColor: selectedParts.selectedColor,
      selectedFace: selectedParts.selectedFace,
    };
    const ignoreTriggerList: string[] = MakerSearchIgnoreTrigger(
      partsObject,
      category
    );
    if (ignoreTriggerList) {
      ignoreTriggerList.forEach((ignoreTrigger) => {
        updateAvaters.category[ignoreTrigger] = {
          ...selectedParts.category[ignoreTrigger],
          partName: "",
          partFlip: selectedParts.category[ignoreTrigger].partFlip,
        };
      });
    }
    if (category === "body") {
      if (!bodyTypeValue) {
        throw new Error("エラー:bodyのbodyTypeプロパティに値がありません");
      } else if (bodyTypeValue.length != 1) {
        throw new Error("エラー:bodyのbodyTypeプロパティに値が複数あります");
      }
      for (category in selectedParts.category) {
        if (category !== "body") {
          selectedParts.category[category].partName !== ""
            ? (updateAvaters.category[category].partName =
                !partsObject[category].partList[
                  Object.keys(partsObject[category].partList)[0]
                ].items[selectedParts.category[category].partName].bodyType ||
                partsObject[category].partList[
                  Object.keys(partsObject[category].partList)[0]
                ].items[
                  selectedParts.category[category].partName
                ].bodyType.includes(partNameValue)
                  ? selectedParts.category[category].partName
                  : "")
            : "";
        }
      }
    }
    setSelectedParts(updateAvaters);
  } catch (error) {
    console.error(error.message);
  }
};

export default MakerChangingPart;
