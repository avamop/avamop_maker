export const MakerChangePart = (
  category: string,
  bodyTypeValue: number[],
  partNameValue: string,
  selectedParts: ViewStatus,
  setSelectedParts: React.Dispatch<React.SetStateAction<ViewStatus>>
) => {
  if (category === "body") {
    try {
      if (bodyTypeValue.length == 0) {
        throw new Error(
          `エラー:${category}のbodyTypeプロパティに値がありません。`
        );
      } else if (bodyTypeValue.length > 1) {
        throw new Error("エラー:bodyのbodyTypeプロパティが複数あります");
      } else if (bodyTypeValue[0] == 0) {
        throw new Error("エラー:bodyのbodyTypeプロパティが0になっています");
      } else {
        const updateAvaters: ViewStatus = {
          bodyType: bodyTypeValue[0],
          category: {
            ...selectedParts.category,
            [category]: {
              ...selectedParts.category[category],
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
      if (bodyTypeValue.length == 0) {
        throw new Error(
          `エラー:${category}のbodyTypeプロパティに値がありませんｎ`
        );
      } else if (bodyTypeValue.length > 1 && bodyTypeValue.includes(0)) {
        throw new Error(
          `エラー:${category}のbodyTypeプロパティに0が入っています`
        );
      }
      const updateAvaters: ViewStatus = {
        bodyType: selectedParts.bodyType,
        category: {
          ...selectedParts.category,
          [category]: {
            ...selectedParts.category[category],
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
