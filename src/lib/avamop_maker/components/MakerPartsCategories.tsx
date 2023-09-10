import MakerPartsButton from './MakerPartsButton';

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  path: string;
  categoryItems: categoryItems;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({ path, imageSrc, category, isSelected, onClick, }) => {
  return (
    <li
      onClick={onClick}
      className={isSelected ? 'selected' : ''}
    >
      <img src={imageSrc} alt={category} /> {category}
      {isSelected && (
          <ul>
          {Object.keys{categoryContents}.map((item) => (
           <MakerPartsButton itemKey={item} imageSrc=[path + categoryContents[item] />   
           ))}
        </ul>
      )}
    </li>
  );
}

export default MakerPartsCategories
