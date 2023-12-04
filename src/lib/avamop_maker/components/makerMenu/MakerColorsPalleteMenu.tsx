import React from "react";
import MakerColorsButton from "./MakerColorsButton";

interface MakerColorsPalleteMenuProps {
  colorsObject: ColorsObject;
}

const MakerColorsPalleteMenu: React.FC<MakerColorsPalleteMenuProps> = ({
  colorsObject,
}) => {
  return (
    <>
      <ul>
        {Object.keys(colorsObject).map((colorName) => (
          <MakerColorsButton
            key={colorName}
            colorCode={colorsObject[colorName]}
            colorName={colorName}
          />
        ))}
      </ul>
    </>
  );
};

export default MakerColorsPalleteMenu;
