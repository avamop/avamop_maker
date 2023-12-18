import React, { useContext } from "react";
import MakerColorsButton from "./MakerColorsButton";
import ColorsObjectContext from "../../store/ColorsObjectContext";

const MakerColorsPalleteMenu: React.FC = ({}) => {
  const colorsObject = useContext(ColorsObjectContext);
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
