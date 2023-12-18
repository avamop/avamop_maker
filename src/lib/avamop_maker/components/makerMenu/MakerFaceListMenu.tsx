import React, { useContext } from "react";
import MakerFaceButton from "./MakerFaceButton";
import FaceListContext from "../../store/FaceListContext";
import SelectedPartsContext from "../../store/SelectedPartsContext";

const MakerFaceListMenu: React.FC = () => {
  const faceList = useContext(FaceListContext);
  const { selectedParts, setSelectedParts } = useContext(SelectedPartsContext);

  const changeFace = (face: string) => {
    let newSelectedFace = { ...selectedParts.selectedFace };
    Object.keys(selectedParts.category).forEach((key) => {
      newSelectedFace[key] = face;
    });
    setSelectedParts({
      ...selectedParts,
      bodyType: selectedParts.bodyType,
      face: face,
      category: selectedParts.category,
      selectedColor: selectedParts.selectedColor, //選択されている色のオブジェクト
      selectedFace: newSelectedFace,
    });
  };

  return (
    <ul>
      {faceList.map((face) => (
        <MakerFaceButton
          key={face}
          face={face}
          // 表情のサムネイルを用意する予定
          // faceImages= {faceImages[face]}
          onClick={() => changeFace(face)}
        />
      ))}
    </ul>
  );
};
export default React.memo(MakerFaceListMenu);
