import React from "react";

interface MakerFaceMenuProps {
  face: string;
  // faceImage: string;
  onClick: () => void;
}

const MakerFaceMenu: React.FC<MakerFaceMenuProps> = ({
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

export default MakerFaceMenu;
