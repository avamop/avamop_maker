import { useState } from "react";
import MakerPartsCategories from "./MakerPartsCategories";

interface MakerMenuProps {
  path: string;
  partObject: PartObject;
}

const MakerManu: React.FC<MakerMenuProps> = ({ path, partObject }) => {
  const viewStatus = {};
  for (const category in partObject) {
    const keys = Object.keys(partObject[category]);
    if (keys.length > 0) {
      viewStatus[category] = { [keys[0]]: partObject[category][keys[0]] };
    }
  }

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState(viewStatus);

  const updateCategoryItem = (category: string, key: string, value: string) => {
    const updateAvaters = {
      ...selectedParts,
      [category]: {
        ...selectedParts[category].keys(partObject[category].items),
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
        selectedParts={selectedParts}
        imageSrc={
          path +
          partObject[category].items[Object.keys(partObject[category].items)[0]].partName
        }
        categoryItems={partObject[category].items}


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

export default MakerManu;
