import { useState } from "react";
import MakerPartsCategories from "./MakerPartsCategories";
interface MakerMenuProps {
  partPath: string;
  partObject: PartObjectMerged;
  thumbnailPath: string;
  thumbnailObject: MenuThumbnail;
}

const convertToViewStatus = (partObject: PartObjectMerged): ViewStatus => {
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
const MakerMenu: React.FC<MakerMenuProps> = ({ partPath, partObject, thumbnailPath, thumbnailObject }) => {

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
    return Object.keys(viewStatus).map((category) => (

      <MakerPartsCategories
        key={category}
        category={category}
        isSelected={selectedCategory === category}
        onClick={() => handleCategoryClick(category)}
        updateCategoryItem={updateCategoryItem}
        path={partPath}
        imageSrc={thumbnailPath + thumbnailObject[category.replace(/_\d+$/, '')].pathUrl}
        categoryItems={partObject[category.replace(/_\d+$/, '')].partList} />
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
