export const MakerSearchIgnoreTrigger = (
  partsObject: PartsObjectSplit,
  currentCategory: string
): string[] => {
  const ignoreTriggerList: string[] = [];
  for (const category in partsObject) {
    const ignoreTrigger = partsObject[category].ignoreTrigger;
    if (ignoreTrigger && ignoreTrigger.includes(currentCategory)) {
      ignoreTriggerList.push(category);
    }
  }
  return ignoreTriggerList.length === 0 ? null : ignoreTriggerList;
};
