import { useState } from "react";
import MakerPartsCategories from "./MakerPartsCategories";
import Jimp from "jimp";
interface MakerMenuProps {
  path: string;
  partObject: PartObjectMerged;
}

const MakerMenu: React.FC<MakerMenuProps> = ({ path, partObject }) => {
  const viewStatus: ViewStatus = {};
  for (const category in partObject) {
    if (partObject.hasOwnProperty(category)) {
      for (viewStatus[category].length)
        viewStatus[category] = {

        };
    }
  }
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
    return Object.keys(partObject).map((category) => (
      <MakerPartsCategories
        key={category}
        category={category}
        isSelected={selectedCategory === category}
        onClick={() => handleCategoryClick(category)}
        updateCategoryItem={updateCategoryItem}
        path={path}
        imageSrc={
          path +
          partObject.category[category].items[
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
