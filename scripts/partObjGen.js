
// カレントディレクトリをルートパスとする
const rootDirectoryPath = process.cwd();

// JSONオブジェクトを生成する関数
function generatePartObject(directoryPath, partChain) {
  const partObject = {};

  const categories = fs.readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  let partOrder = 0;

  for (const category of categories) {
    partOrder++;
    const categoryPath = path.join(directoryPath, category);
    const categoryPartChain = partChain ? `${partChain}/${category}` : category;

    partObject[category] = {
      partCount: 1,
      partChain: categoryPartChain,
      partOrder,
      items: {},
    };

    const items = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const item of items) {
      const itemPath = path.join(categoryPath, item);
      const faces = fs.readdirSync(itemPath, { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.png'))
        .map((dirent) => dirent.name);

      partObject[category].items[item] = {};

      for (const face of faces) {
        const faceName = path.basename(face, path.extname(face));
        const facePath = path.join(categoryPartChain, item, face);
        partObject[category].items[item][faceName] = {
          facePath,
        };
      }
    }
  }

  return partObject;
}

// カレントディレクトリからJSONオブジェクトを生成
const partObject = generatePartObject(rootDirectoryPath, null);

// 生成したJSONオブジェクトをコンソールに出力
console.log(JSON.stringify(partObject, null, 2));
