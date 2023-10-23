import React from 'react'
import { useEffect, useState } from 'react'
import 'jimp/browser/lib/jimp.js'
import type { Jimp } from 'jimp/browser/lib/jimp';
const MakerPartsButton = React.lazy(() => import("./MakerPartsButton"));

interface MakerPartsCategoriesProps {
  category: string;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  path: string;
  categoryItems: CategoryMerged;
  updateCategoryItem: (category: string, key: string, value: string) => void;
}

interface CombinePart {
  [key: string]: {
    part: Jimp;
  }
}

interface CombinePartBase64 {
  [key: string]: {
    part: string;
  }
}

const convertPartList = (categoryItems: CategoryMerged): CategoryItemsCombined => {
  const categoryItemsCombined: CategoryItemsCombined = {};
  for (const partSplit in categoryItems) {
    const partData = categoryItems[partSplit];
    for (const item in partData.items) {
      if (!categoryItemsCombined[item]) {
        categoryItemsCombined[item] = {
          body: partData.items[item].body,
          peace: {},
        };
      }
      categoryItemsCombined[item].peace[partSplit] = {
        faces: partData.items[item].faces,
      };
    }
  }
  return categoryItemsCombined;
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
  // const SplitCombine = async (categoryItems: CategoryMerged): Promise<CombinePartBase64> => {
  //   let combinePart: CombinePart = {}
  //   let combinePartBase64: CombinePartBase64 = {}
  //   for (const partSplit in categoryItems) {
  //     for (const partKey in categoryItems[partSplit].items) {
  //       const part = categoryItems[partSplit].items[partKey];
  //       const image = await Jimp.read(path + part.faces.normal.facePath);
  //       if (combinePart.hasOwnProperty(partKey)) {
  //         combinePart[partKey].part.composite(image, 0, 0);
  //       } else {
  //         combinePart[partKey] = { part: image };
  //       }
  //     }
  //   }
  //   for (const key in combinePart) {
  //     combinePartBase64[key] = { part: await combinePart[key].part.getBase64Async(Jimp.MIME_PNG) };
  //   }
  //   // console.log('%o', combinePartBase64)
  //   return combinePartBase64
  // }
  //
  // const [menuPartIcon, setMenuPartIcon] = useState<CombinePartBase64 | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await SplitCombine(categoryItems);
  //       setMenuPartIcon(result);
  //       setIsLoading(false); // データの読み込みが完了
  //     } catch (error) {
  //       // エラーハンドリング
  //       console.error(error);
  //     }
  //   };
  //
  //   fetchData();
  // }, [categoryItems]);
  //
  return (
    <li className={isSelected ? "selected" : ""}>
      <img onClick={onClick} src={imageSrc} alt={category} /> {category}
      {(isSelected && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ul>
            {Object.keys(Object.values(categoryItems)[0].items).map((item) => (
              <MakerPartsButton
                key={item}
                item={item}
                buttonImage={categoryItems}
                onClick={() =>
                  updateCategoryItem(category, "partName", item.toString())
                }
              />
            ))}
          </ul>
        </React.Suspense>
      )
      )}
    </li>
  );
};

export default MakerPartsCategories;
