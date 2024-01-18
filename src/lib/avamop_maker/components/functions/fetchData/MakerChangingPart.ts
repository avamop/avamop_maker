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
      for (const tmpCategory in selectedParts.category) {
        if (tmpCategory !== "body") {
          selectedParts.category[tmpCategory].partName !== ""
            ? (updateAvaters.category[tmpCategory].partName =
                !partsObject[tmpCategory].partList[
                  Object.keys(partsObject[tmpCategory].partList)[0]
                ].items[selectedParts.category[tmpCategory].partName]
                  .bodyType ||
                partsObject[tmpCategory].partList[
                  Object.keys(partsObject[tmpCategory].partList)[0]
                ].items[
                  selectedParts.category[tmpCategory].partName
                ].bodyType.includes(partNameValue)
                  ? selectedParts.category[tmpCategory].partName
                  : "")
            : "";
        }
        for (const partSplit in partsObject[tmpCategory].partList) {
          if (
            !selectedParts.selectedColor[
              partsObject[tmpCategory].partList[partSplit].colorGroup
            ]
          ) {
            selectedParts.selectedColor[
              partsObject[tmpCategory].partList[partSplit].colorGroup
            ] = {
              default: {
                color: selectedParts.selectedColor["none"]["default"].color,
                hueReverse:
                  selectedParts.selectedColor["none"]["default"].hueReverse,
                saturationReverse:
                  selectedParts.selectedColor["none"]["default"]
                    .saturationReverse,
                hueGraph:
                  selectedParts.selectedColor["none"]["default"].hueGraph,
                saturationGraph:
                  selectedParts.selectedColor["none"]["default"]
                    .saturationGraph,
                valueGraph:
                  selectedParts.selectedColor["none"]["default"].valueGraph,
              },
            };
          }
        }
      }
    }
    setSelectedParts(updateAvaters);
  } catch (error) {
    console.error(error.message);
  }
};

export default MakerChangingPart;
