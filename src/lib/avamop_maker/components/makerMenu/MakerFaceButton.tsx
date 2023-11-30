import React from "react";
import  "../../module-css/makerMenu/MakerFaceButton.module.css"; // CSSファイルをインポート

interface MakerFaceButtonProps {
  face: string;
  // faceImage: string;
  onClick: () => void;
}

const MakerFaceButton: React.FC<MakerFaceButtonProps> = ({
  face,
  // faceImage,

  onClick,
}) => {
  return (
    
    
      <li className="hover" onClick={onClick}>
      {/* <img src={faceImage} alt={face} /> */}
      {face}
    </li>
  );
};

export default MakerFaceButton;
