import { createContext } from "react";

const SelectedPartsForCanvasContext = createContext<{
  selectedPartsForCanvas: SelectedPartsForCanvas;
  setSelectedPartsForCanvas: React.Dispatch<
    React.SetStateAction<SelectedPartsForCanvas>
  >;
}>(null);

export default SelectedPartsForCanvasContext;
