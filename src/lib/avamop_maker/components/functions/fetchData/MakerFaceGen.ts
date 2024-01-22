export const MakerFaceGen = (node: FaceTree): FaceList[] => {
  let result: { face: string; image: string }[] = [];

  result.push({ face: node.face, image: node.image });

  if (node.children.length > 0) {
    for (let child of node.children) {
      result = result.concat(MakerFaceGen(child));
    }
  }

  return result;
};
