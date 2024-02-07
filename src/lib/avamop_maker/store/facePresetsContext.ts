import { createContext } from "react";

const FacePresetsContext = createContext<FaceTree>({
  face: "clear",
  image: "",
  children: [],
});

export default FacePresetsContext;
