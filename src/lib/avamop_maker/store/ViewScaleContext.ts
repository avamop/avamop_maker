import { createContext } from "react";

const ViewScaleContext = createContext<number>(
  /*window.innerWidth < 480 ? 1 : 2*/ 720
);

export default ViewScaleContext;
