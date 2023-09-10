import { useState } from 'react';
import MakerPartsCategories from './MakerPartsCategories';

interface MakerMenuProps {
  objectStructure: ObjectStructure;
  path: string;
}

const MakerManu: React.FC<MakerMenuProps> = ({ objectStructure, path }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const renderCategories = () => {
    return Object.keys(objectStructure).map((category) => (
      <MakerPartsCategories
        key={category}
        category={category}
        isSelected={selectedCategory === category}
        onClick={() => handleCategoryClick(category)}
        path={path}
        imageSrc={path + objectStructure[category][Object.keys(objectStructure[category])[0]]}
        categoryItems={objectStructure[category]}
      />
    ));
  };


  return (
    <div></div>

  );
};

export default MakerManu;
