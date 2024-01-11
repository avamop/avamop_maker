import { createContext } from "react";

const PartObjectJimpContext = createContext<{
  partsObjectJimp: PartsObjectJimp;
  setPartsObjectJimp:
    | React.Dispatch<React.SetStateAction<PartsObjectJimp>>
    | undefined;
}>(null);

export default PartObjectJimpContext;
