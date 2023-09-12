import MakerPartsButton from "./MakerPartsButton";

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  path: string;
  categoryItems: CategoryItems;
  updateCategoryItem: (category: string, key: string, value: string) => void;
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
    <li className={isSelected ? "selected" : ""}>
      <img onClick={onClick} src={imageSrc} alt={category} /> {category}
      {isSelected && (
        <ul>
          {Object.keys(categoryItems).map((item) => (
            <MakerPartsButton
              key={item}
              item={item}
              path={path}
              imageSrc={categoryItems[item].toString()}
              onClick={() =>
                updateCategoryItem(
                  category,
                  Object.keys(selectedParts[category])[0],
                  categoryItems[item].toString(),
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
