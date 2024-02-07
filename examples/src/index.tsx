import React from "react";
import ReactDOM from "react-dom/client";
import partData from "../partListSplit.json";
import colorsObject from "../colors.json";
import defaultColors from "../defaultColors.json";
import facePresets from "../faceTree.json";
import defaultAvaters from "../defaultAvater.json";
import AvamopMaker from "../../src/lib/avamop_maker/AvamopMaker";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AvamopMaker
      partsPath="/examples/parts/"
      facePath="/examples/faces/"
      partsObject={partData}
      colorsObject={colorsObject}
      defaultColors={defaultColors}
      defaultAvaters={defaultAvaters}
      facePresets={facePresets}
      nullImagePath="blank.png"
    />
  </React.StrictMode>
);
