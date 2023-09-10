import MakerPartsButton from "./MakerPartsButton";

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  path: string;
  categoryItems: CategoryItems;
  updateCategoryItem: (category: string, key: string[], value: string) => void;
  selectedParts: ViewStatus;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({
  path,
  imageSrc,
  category,
  isSelected,
  onClick,
  updateCategoryItem,
  categoryItems,
  selectedParts,
}) => {
  return (
    <li onClick={onClick} className={isSelected ? "selected" : ""}>
      <img src={imageSrc} alt={category} /> {category}
      {isSelected && (
        <ul>
          {Object.keys(categoryItems).map((item) => (
            <MakerPartsButton
              item={item}
              imageSrc={path + categoryItems[item]}
              onClick={() =>
                updateCategoryItem(
                  category,
                  Object.keys(selectedParts[category]),
                  item,
                )
              }
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MakerPartsCategories;
