import { MakerSearchIgnoreTrigger } from "./MakerSearchIgnoreTrigger";

export const MakerChangingPart = (
  category: string,
  bodyTypeValue: string[],
  partNameValue: string,
  selectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>,
  partsObject: PartsObjectSplit
) => {
  // try {
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
    if (!bodyTypeValue || bodyTypeValue.length === 0) {
      throw new Error("エラー:bodyのbodyTypeプロパティに値がありません");
    } else if (bodyTypeValue.length > 1) {
      throw new Error("エラー:bodyのbodyTypeプロパティに値が複数あります");
    }
    for (const tmpCategory in updateAvaters.category) {
      if (tmpCategory !== "body") {
        updateAvaters.category[tmpCategory].partName !== ""
          ? (updateAvaters.category[tmpCategory].partName =
              partsObject[tmpCategory].partList[
                Object.keys(partsObject[tmpCategory].partList)[0]
              ].items[selectedParts.category[tmpCategory].partName].bodyType
                .length === 0 ||
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
          !updateAvaters.selectedColor[
            partsObject[tmpCategory].partList[partSplit].colorGroup
          ]
        ) {
          updateAvaters.selectedColor[
            partsObject[tmpCategory].partList[partSplit].colorGroup
          ] = {
            default: {
              color: selectedParts.selectedColor["none"]["default"].color,
              hueReverse:
                selectedParts.selectedColor["none"]["default"].hueReverse,
              saturationReverse:
                selectedParts.selectedColor["none"]["default"]
                  .saturationReverse,
              hueGraph: selectedParts.selectedColor["none"]["default"].hueGraph,
              saturationGraph:
                selectedParts.selectedColor["none"]["default"].saturationGraph,
              valueGraph:
                selectedParts.selectedColor["none"]["default"].valueGraph,
            },
          };
        }
      }
      if (
        Object.keys(
          partsObject[category].partList[
            Object.keys(partsObject[category].partList)[0]
          ].items[partNameValue].faces
        ).includes(updateAvaters.selectedFace[category])
      ) {
        updateAvaters.selectedFace[category] =
          updateAvaters.selectedFace[category];
      } else {
        updateAvaters.selectedFace[category] = "clear";
      }
    }
  }
  setSelectedParts(updateAvaters);
  // } catch (error) {
  //   console.error(error.message);
  // }
};

export default MakerChangingPart;
