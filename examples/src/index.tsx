import React from "react";
import ReactDOM from "react-dom/client";
import partData from "../partList.json";
import menuThumbnail from "../menuThumbnail.json"
import { AvamopMaker } from "../../src/lib/avamop_maker/AvamopMaker";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AvamopMaker partPath="/examples/assets/parts/" partObject={partData} thumbnailPath="/examples/assets/thumbnails/" thumbnailObject={menuThumbnail} />
  </React.StrictMode>,
);
