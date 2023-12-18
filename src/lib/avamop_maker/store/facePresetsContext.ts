import { createContext } from "react";

const FacePresetsContext = createContext<faceTree>({
  face: "clear",
  children: [],
});

export default FacePresetsContext;
