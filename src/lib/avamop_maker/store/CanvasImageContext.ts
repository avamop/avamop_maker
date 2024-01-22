import { Dispatch, SetStateAction, createContext } from "react";
import "jimp/browser/lib/jimp";
import { JimpObject, JimpType } from "../types/jimp";

declare const Jimp: JimpObject;

const CanvasImageContext = createContext<{
  canvasImage: JimpType[];
  setCanvasImage: Dispatch<SetStateAction<JimpType[]>>;
}>(null);

export default CanvasImageContext;
