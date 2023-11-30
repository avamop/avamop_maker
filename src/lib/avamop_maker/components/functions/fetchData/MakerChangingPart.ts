export const MakerChangingPart = (
  category: string,
  bodyTypeValue: string[],
  partNameValue: string,
  SelectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>
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
            ...SelectedParts.category,
            [category]: {
              ...SelectedParts.category[category],
              partName: partNameValue,
            },
          },
        };
        setSelectedParts(updateAvaters);
      }
    } catch (error) {
      console.error(error.message);
    }
  } else {
    try {
      const updateAvaters: SelectedParts = {
        bodyType: SelectedParts.bodyType,
        category: {
          ...SelectedParts.category,
          [category]: {
            ...SelectedParts.category[category],
            partName: partNameValue,
          },
        },
      };
      setSelectedParts(updateAvaters);
    } catch (error) {
      console.error(error.message);
    }
  }
};
