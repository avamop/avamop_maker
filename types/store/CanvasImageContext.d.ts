import { Dispatch, SetStateAction } from "react";
import "jimp/browser/lib/jimp";
import { JimpType } from "../types/jimp";
declare const CanvasImageContext: import("react").Context<{
    canvasImage: JimpType[];
    setCanvasImage: Dispatch<SetStateAction<JimpType[]>>;
}>;
export default CanvasImageContext;
//# sourceMappingURL=CanvasImageContext.d.ts.map