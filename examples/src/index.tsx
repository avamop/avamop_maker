import React from "react";
import ReactDOM from "react-dom/client";
import partData from "../partListSplit.json";
import categoryIconObject from "../categoryIcon.json";
import colorsObject from "../colors.json";
import defaultColors from "../defaultColors.json";
import { AvamopMaker } from "../../src/lib/avamop_maker/AvamopMaker";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AvamopMaker
      path="/examples/assets/"
      partsObject={partData}
      categoryIconObject={categoryIconObject}
      colorsObject={colorsObject}
      defaultColors={defaultColors}
    />
  </React.StrictMode>
);
