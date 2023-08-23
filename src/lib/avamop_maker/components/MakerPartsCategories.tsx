interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({ imageSrc, category, isSelected, onClick, }) => {
  return (
    <li
      onClick={onClick}
      className={isSelected ? 'selected' : ''}
    >
      <img src={imageSrc} alt={category} /> {category}
    </li>
  );
}

export default MakerPartsCategories
