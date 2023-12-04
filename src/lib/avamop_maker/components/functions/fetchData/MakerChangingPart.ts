export const MakerChangingPart = (
  category: string,
  bodyTypeValue: string[],
  partNameValue: string,
  selectedParts: SelectedParts,
  setselectedParts: React.Dispatch<React.SetStateAction<selectedParts>>
) => {
  if (category === "body") {
    try {
      //bodyの値が正常かどうかを判定する
      if (bodyTypeValue) {
        throw new Error("エラー:bodyのbodyTypeプロパティに値があります");
      } else {
        const updateAvaters: SelectedParts = {
          bodyType: partNameValue,
          category: {
            ...selectedParts.category,
            [category]: {
              ...selectedParts.category[category],
              partName: partNameValue,
            },
          },
        };
        setselectedParts(updateAvaters);
      }
    } catch (error) {
      console.error(error.message);
    }
  } else {
    try {
      const updateAvaters: SelectedParts = {
        bodyType: SelectedParts.bodyType,
        category: {
          ...selectedParts.category,
          [category]: {
            ...selectedParts.category[category],
            partName: partNameValue,
          },
        },
      };
      setselectedParts(updateAvaters);
    } catch (error) {
      console.error(error.message);
    }
  }
};
