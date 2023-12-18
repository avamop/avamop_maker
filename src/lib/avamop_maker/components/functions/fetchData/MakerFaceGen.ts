export const MakerFaceGen = (node: faceTree): string[] => {
  let faces = [node.face];
  for (let child of node.children) {
    faces = faces.concat(MakerFaceGen(child));
  }
  return faces;
};
