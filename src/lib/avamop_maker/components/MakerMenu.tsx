import { useState } from 'react';
import MakerPartsCategories from './MakerPartsCategories';
import MakerPartsButton from './MakerPartsButton';

interface ObjectStructure {
  [category: string]: {
    [item: string]: {
      partName: string
    };
  };
}

interface MakerMenuProps {
  objectStructure: ObjectStructure;
  path: String;
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
        imageSrc={path + objectStructure[category][Object.keys(objectStructure[category])[0]]} // 画像のパスを渡す
      />
    ));
  };

  const renderCategoryContents = () => {
    if (selectedCategory) {
      const categoryContents = objectStructure[selectedCategory];
      return (
        <ul>
          {Object.keys(categoryContents).map((item) => (
            <MakerPartsButton
              key={item}
              content={item}
              imageSrc={path + categoryContents[item]} // 画像のパスを渡す
            />
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="menu">
      <div className="category-list">
        <ul>{renderCategories()}</ul>
      </div>
      <div className="category-contents">
        {renderCategoryContents()}
      </div>
    </div>
  );
};

export default MakerManu;
