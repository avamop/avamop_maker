export const MakerChangingPart = (
  category: string,
  bodyTypeValue: number[],
  partNameValue: string,
  SelectedParts: SelectedParts,
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>
) => {
  if (category === "body") {
    try {
      //bodyの値が正常かどうかを判定する
      if (!bodyTypeValue) {
        throw new Error("エラー:bodyのbodyTypeプロパティに値がありません。");
      } else if (bodyTypeValue.length > 1) {
        throw new Error("エラー:bodyのbodyTypeプロパティが複数あります");
      } else if (bodyTypeValue[0] == 0) {
        throw new Error("エラー:bodyのbodyTypeプロパティが0になっています");
      } else {
        const updateAvaters: SelectedParts = {
          bodyType: bodyTypeValue[0],
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
      //bodyの値が正常かどうかを判定する
      if (bodyTypeValue && bodyTypeValue.includes(0)) {
        throw new Error(
          `エラー:${category}のbodyTypeプロパティに0が入っています`
        );
      }
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
