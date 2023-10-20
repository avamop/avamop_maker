import { Box } from "@chakra-ui/react";
import MakerMenu from "./components/MakerMenu";

interface AvamopMakerProps {
  partPath: string;
  partObject: PartObject;
  thumbnailPath: string;
  thumbnailObject: MenuThumbnail;
}

function mergeCategories(data: PartObject): PartObjectMerged {
  const mergedCategories: PartObjectMerged = {};

  //partChainが一致するカテゴリを一纏めにする
  for (const category in data) {
    const currentCategory = data[category];
    const partChain = currentCategory.partChain;

    if (!mergedCategories[partChain]) {
      // If the partChain doesn't exist in the mergedCategories, create a new entry.
      mergedCategories[partChain] = {
        partList: {},
        partCount: currentCategory.partCount,
        partChain: partChain,
      };
    }

    const currentPartList = mergedCategories[partChain].partList;

    if (!currentPartList[category]) {
      // If the category doesn't exist in the currentPartList, create a new entry.
      currentPartList[category] = {
        partOrder: currentCategory.partOrder,
        items: currentCategory.items,
      };
    } else {
      // Check if partCount, partChain, and items are the same in the current category.
      const existingCategory = currentPartList[category];

      if (
        existingCategory.partOrder !== currentCategory.partOrder ||
        existingCategory.items !== currentCategory.items
      ) {
        throw new Error(`Mismatched properties in category: ${category}`);
      }
    }
  }

  return mergedCategories;
}

const AvamopMaker: React.FC<AvamopMakerProps> = ({ partPath, partObject, thumbnailPath, thumbnailObject }) => {

  const mergedData: PartObjectMerged = mergeCategories(partObject);
  // console.log("%o", mergedData);

  return (
    <Box bg="gray.50">
      <MakerMenu partPath={partPath} partObject={mergedData} thumbnailPath={thumbnailPath} thumbnailObject={thumbnailObject} />
    </Box>
  );
};

export { AvamopMaker };
