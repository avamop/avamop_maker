const fs = require("fs");

const mergeCategories = (data) => {
  const splitCategories = {};
  const partOrders = new Set();

  for (const category in data) {
    const currentCategory = data[category];
    const partChain = currentCategory.partChain;

    if (partChain === "body") {
      for (const item in currentCategory.items)
        if (
          !Array.isArray(currentCategory.items[item].bodyType) ||
          currentCategory.items[item].bodyType.length !== 1 ||
          typeof currentCategory.items[item].bodyType[0] !== "string"
        ) {
          throw new Error(
            `Invalid bodyType in category: ${category},${partChain}`
          );
        }
    }

    if (partOrders.has(currentCategory.partOrder)) {
      throw new Error(`Duplicate partOrder in category: ${category}`);
    }
    partOrders.add(currentCategory.partOrder);

    if (!splitCategories[partChain]) {
      splitCategories[partChain] = {
        partCount: currentCategory.partCount,
        partChain: partChain,
        ignoreTrigger: currentCategory.ignoreTrigger,
        partFlip: currentCategory.partFlip,
        partList: {},
      };
    }

    const currentPartList = splitCategories[partChain].partList;

    if (!currentPartList[category]) {
      currentPartList[category] = {
        colorGroup: currentCategory.colorGroup,
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

    // 各category毎に、同一のitemsのプロパティを持つすべてのプロパティのfaceキーを集め、それぞれのpartSplit内の同一のitems内のfacesプロパティにおいて欠けているプロパティがあれば中のimagePathプロパティに""を代入して追加する
    for (const item in currentPartList[category].items) {
      const faces = currentPartList[category].items[item].faces;
      for (const face in faces) {
        if (!faces[face]) {
          faces[face] = { imagePath: "" };
        }
      }
      // 同様の条件で、どれか1つでも何らかのプロパティが存在してかつ、いずれのプロパティにもclearプロパティが無い場合に、同様にimagePathに""を代入したclearプロパティを追加する
      if (!faces.clear) {
        faces.clear = { imagePath: "" };
      }
    }
  }

  return splitCategories;
};

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
    const SplitData = mergeCategories(inputData);

    fs.writeFile(outputFilePath, JSON.stringify(SplitData, null, 2), (err) => {
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
