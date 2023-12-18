import { Dispatch, SetStateAction, createContext } from "react";

const CanvasImageContext = createContext<{
  canvasImage: string[];
  setCanvasImage: Dispatch<SetStateAction<string[]>>;
}>(null);

export default CanvasImageContext;
