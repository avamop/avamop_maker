import { Dispatch, SetStateAction, createContext } from "react";
import Jimp from "jimp/browser/lib/jimp";
import { JimpObject } from "../types/jimp";

const CanvasImageContext = createContext<{
  canvasImage: Jimp[];
  setCanvasImage: Dispatch<SetStateAction<Jimp[]>>;
}>(null);

export default CanvasImageContext;
