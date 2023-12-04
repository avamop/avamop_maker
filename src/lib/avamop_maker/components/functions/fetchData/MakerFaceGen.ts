//パーツオブジェクトから表情一覧を生成する
export const MakerFaceGen = (partsObject: PartsObjectSplit) => {
  const faceList: string[] = [];
  for (const category in partsObject) {
    for (const partSplit in partsObject[category].partList) {
      for (const item in partsObject[category].partList[partSplit].items) {
        for (const face in partsObject[category].partList[partSplit].items[item]
          .faces) {
          if (!faceList.includes(face)) {
            faceList.push(face);
          }
        }
      }
    }
  }

  return faceList;
};
