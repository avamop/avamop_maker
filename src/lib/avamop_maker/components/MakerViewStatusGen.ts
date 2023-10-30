export const MakerViewStatusGen = (partObject: PartObjectMerged): ViewStatus => {
  const viewStatus: ViewStatus = {};

  for (const category in partObject) {
    const { partList, partCount } = partObject[category];
    const partSplits = Object.keys(partList);

    for (let i = 0; i < partCount; i++) {
      const partSplit = partSplits[0];
      const partName = Object.keys(partObject[category].partList[partSplit].items)[0]
      const partBody = partObject[category].partList[partSplit].items[Object.keys(partObject[category].partList[partSplit].items)[0]].body;
      partObject[category].partCount === 1 ? viewStatus[category] = { partName, partBody } : viewStatus[`${category}_${i + 1}`] = { partName, partBody };
    }
  }

  return viewStatus;
}

