import React from "react";
import MakerColorsPalleteMenu from "./MakerColorsPalleteMenu";

interface MakerColorsMenuProps {
  colorsObject: ColorsObject;
}

const MakerColorsMenu: React.FC<MakerColorsMenuProps> = ({ colorsObject }) => {
  return (
    <>
      <MakerColorsPalleteMenu colorsObject={colorsObject} />
    </>
  );
};

export default MakerColorsMenu;
