export const MakerChangingPart = (
  category: string,
  bodyTypeValue: number[],
  partNameValue: string,
  SelectedPartss: SelectedParts,
  setSelectedPartss: React.Dispatch<React.SetStateAction<SelectedParts>>
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
            ...SelectedPartss.category,
            [category]: {
              ...SelectedPartss.category[category],
              partName: partNameValue,
            },
          },
        };
        setSelectedPartss(updateAvaters);
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
        bodyType: SelectedPartss.bodyType,
        category: {
          ...SelectedPartss.category,
          [category]: {
            ...SelectedPartss.category[category],
            partName: partNameValue,
          },
        },
      };
      setSelectedPartss(updateAvaters);
    } catch (error) {
      console.error(error.message);
    }
  }
};
