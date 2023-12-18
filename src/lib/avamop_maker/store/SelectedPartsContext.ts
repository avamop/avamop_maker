import { createContext } from "react";

const SelectedPartsContext = createContext<{
  selectedParts: SelectedParts;
  setSelectedParts: React.Dispatch<React.SetStateAction<SelectedParts>>;
}>(null);

export default SelectedPartsContext;
