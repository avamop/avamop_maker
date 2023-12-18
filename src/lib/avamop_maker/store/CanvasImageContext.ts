import { Dispatch, SetStateAction, createContext } from "react";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

const CanvasImageContext = createContext<{
  canvasImage: Jimp[];
  setCanvasImage: Dispatch<SetStateAction<Jimp[]>>;
}>(null);

export default CanvasImageContext;
