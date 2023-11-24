//パーツオブジェクトから表情一覧を生成する
export const MakerFaceGen = (PartsObject: PartsObjectSplit) => {
  const faceList: string[] = [];
  for (const category in PartsObject) {
    for (const partSplit in PartsObject[category].partList) {
      for (const item in PartsObject[category].partList[partSplit].items) {
        for (const face in PartsObject[category].partList[partSplit].items[item]
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
