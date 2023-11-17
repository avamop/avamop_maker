const fs = require("fs");

function mergeCategories(data) {
  const mergedCategories = {};

  for (const category in data) {
    const currentCategory = data[category];
    const partChain = currentCategory.partChain;

    if (!mergedCategories[partChain]) {
      mergedCategories[partChain] = {
        colorGroup: currentCategory.colorGroup,
        partCount: currentCategory.partCount,
        partChain: partChain,
        ignoreTrigger: currentCategory.ignoreTrigger,
        partList: {},
      };
    }

    const currentPartList = mergedCategories[partChain].partList;

    if (!currentPartList[category]) {
      currentPartList[category] = {
        partOrder: currentCategory.partOrder,
        items: currentCategory.items,
      };
    } else {
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

if (process.argv.length !== 4) {
  console.log("Usage: node script.js input.json output.json");
  process.exit(1);
}

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading input file: ${err}`);
    process.exit(1);
  }

  try {
    const inputData = JSON.parse(data);
    const mergedData = mergeCategories(inputData);

    fs.writeFile(outputFilePath, JSON.stringify(mergedData, null, 2), (err) => {
      if (err) {
        console.error(`Error writing output file: ${err}`);
        process.exit(1);
      }
      console.log(`Data has been successfully written to ${outputFilePath}`);
    });
  } catch (err) {
    console.error(`Error parsing input data: ${err}`);
    process.exit(1);
  }
});
