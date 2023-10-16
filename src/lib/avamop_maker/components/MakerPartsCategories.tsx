import MakerPartsButton from "./MakerPartsButton";
import Jimp from "jimp";

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  path: string;
  categoryItems: ItemsMerged;
  updateCategoryItem: (category: string, key: string, value: string) => void;
}

const MakerPartsCategories: React.FC<MakerPartsCategoriesProps> = ({
  path,
  imageSrc,
  category,
  isSelected,
  onClick,
  updateCategoryItem,
  categoryItems,
}) => {
  for (const partSplit in categoryItems) {
    for (const part in JSON.parse(partSplit).items) {
      const { faces, }
    }
    Jimp.read(path + JSON.parse(part).)
  }

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
              imageSrc={categoryItems[item].normal.facePath}
              onClick={() =>
                updateCategoryItem(category, "partName", item.toString())
              }
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MakerPartsCategories;
