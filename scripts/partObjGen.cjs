const fs = require("fs");
const path = require("path");

if (process.argv.length < 4) {
  console.error("Usage: node script.js inputDirectory outputFilePath");
  process.exit(1);
}

const inputDirectory = process.argv[2];
const outputFilePath = process.argv[3];

// 型定義
const partsObject = {};

// JSONオブジェクトを生成する関数
const generatepartsObject = (directoryPath, partChain) => {
  const categories = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  let partOrder = 0;

  for (const category of categories) {
    partOrder++;
    const categoryPath = path.join(directoryPath, category);
    const categoryPartChain = partChain ? `${partChain}/${category}` : category;

    partsObject[category] = {
      colorGroup: category,
      partCount: 1,
      partChain: categoryPartChain,
      partOrder,
      ignoreTrigger: null,
      partFlip: false,
      items: {},
    };

    const items = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const item of items) {
      const itemPath = path.join(categoryPath, item);
      const faces = fs
        .readdirSync(itemPath, { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".png"))
        .map((dirent) => dirent.name);
      partsObject[category].items[item] = {
        bodyType: null,
        enableColor: true,
        faces: {},
      };
      for (const face of faces) {
        const faceName = path.basename(face, path.extname(face));
        const imagePath = path.join(categoryPartChain, item, face);

        partsObject[category].items[item].faces[faceName] = {
          imagePath: imagePath,
        };
      }
    }
  }
};

// 指定されたディレクトリからJSONオブジェクトを生成
generatepartsObject(inputDirectory, null);

// 生成したJSONオブジェクトをファイルに保存
const jsonOutput = JSON.stringify(partsObject, null, 2);

fs.writeFileSync(outputFilePath, jsonOutput);

console.log(`File tree JSON data has been written to ${outputFilePath}`);
