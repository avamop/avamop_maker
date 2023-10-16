import { useState } from "react";
import MakerPartsCategories from "./MakerPartsCategories";
import Jimp from "jimp";
interface MakerMenuProps {
  path: string;
  partObject: PartObjectMerged;
}

const convertToViewStatus = (partObjectMerged: PartObjectMerged): ViewStatus => {
  const viewStatus: ViewStatus = {};

  for (const category in partObjectMerged) {
    const { partList, partCount } = partObjectMerged[category];
    const partSplits = Object.keys(partList);

    for (let i = 0; i < partCount; i++) {
      const partSplit = partSplits[0];
      const partName = partObjectMerged[category].partCount === 1 ? Object.keys(partObjectMerged[category].partList[partSplit].items)[0] : Object.keys(partObjectMerged[category].partList[partSplit].items)[0];
      const partBody = partObjectMerged[category].partCount === 1 ? partObjectMerged[category].partList[partSplit].items[Object.keys(partObjectMerged[category].partList[partSplit].items)[0]].body : partObjectMerged[category].partList[partSplit].items[Object.keys(partObjectMerged[category].partList[partSplit].items)[0]].body;
      viewStatus[`${category}_${i + 1}`] = { partName, partBody };
    }
  }

  return viewStatus;
}
const MakerMenu: React.FC<MakerMenuProps> = ({ path, partObject }) => {

  const viewStatus: ViewStatus = convertToViewStatus(partObject)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState(viewStatus);
  const [selectedFace, setSelectedFace] = useState<string>("normal");

  const updateCategoryItem = (category: string, key: string, value: string) => {
    const updateAvaters = {
      ...selectedParts,
      [category]: {
        ...selectedParts[category],
        [key]: value,
      },
    };
    setSelectedParts(updateAvaters);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const renderCategories = () => {
    const menuThumbnail: MenuThumbnail = {}
    for (const category in partObject) {
      const { partList, partCount } = partObjectMerged[category];
      const partSplits = Object.keys(partList);
      for (let i = 0; i < partCount; i++) {
        const partSplit = partSplits[0];
        const partName = partObjectMerged[category].partCount === 1 ? Object.keys(partObjectMerged[category].partList[partSplit].items)[0] : Object.keys(partObjectMerged[category].partList[partSplit].items)[0];
        const partBody = partObjectMerged[category].partCount === 1 ? partObjectMerged[category].partList[partSplit].items[Object.keys(partObjectMerged[category].partList[partSplit].items)[0]].body : partObjectMerged[category].partList[partSplit].items[Object.keys(partObjectMerged[category].partList[partSplit].items)[0]].body;
        viewStatus[`${category}_${i + 1}`] = { partName, partBody };
      }

    }
    return Object.keys(viewStatus).map((category) => (
      <MakerPartsCategories
        key={category}
        category={category}
        isSelected={selectedCategory === category}
        onClick={() => handleCategoryClick(category)}
        updateCategoryItem={updateCategoryItem}
        path={path}
        imageSrc={
          path +
          partObject.category[category.replace(/_\d+$/, '')].items[
            Object.keys(partObject.category[category].items)[0]
          ].normal.facePath
        }
        categoryItems={partObject.category[category].items}
      />
    ));
  };

  return (
    <div>
      <ul>{renderCategories()}</ul>
      <button onClick={() => console.log("%o", selectedParts)}>button</button>
    </div>
  );
};

export default MakerMenu;
