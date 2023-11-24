//パーツオブジェクトから表情一覧を生成する
export const MakerFaceGen = (partObject: PartObjectMerged) => {
  const faceList: string[] = [];
  for (const category in partObject) {
    for (const partSplit in partObject[category].partList) {
      for (const item in partObject[category].partList[partSplit].items) {
        for (const face in partObject[category].partList[partSplit].items[item]
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
