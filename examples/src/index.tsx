import React from "react";
import ReactDOM from "react-dom/client";
import partData from "../partListMerged.json";
import menuThumbnail from "../menuThumbnail.json"
import { AvamopMaker } from "../../src/lib/avamop_maker/AvamopMaker";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AvamopMaker path="/examples/assets/" partObject={partData} thumbnailObject={menuThumbnail} />
  </React.StrictMode>,
);
