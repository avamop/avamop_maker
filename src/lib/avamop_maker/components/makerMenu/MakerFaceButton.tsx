import React from "react";

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
    <li onClick={onClick}>
      {/* <img src={faceImage} alt={face} /> */}
      {face}
    </li>
  );
};

export default MakerFaceButton;
