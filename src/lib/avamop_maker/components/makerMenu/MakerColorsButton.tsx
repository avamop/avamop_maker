import React from "react";

interface MakerColorsButton {
  colorCode: string;
  colorName: string;
}

const MakerColorsButton: React.FC<MakerColorsButton> = ({
  colorCode,
  colorName,
}) => {
  return <li style={{ color: colorCode }}>{colorName}</li>;
};

export default MakerColorsButton;
