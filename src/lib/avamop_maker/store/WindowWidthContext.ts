import { createContext } from "react";

const WindowWidthContext = createContext<number>(/*window.innerWidth*/ 720);

export default WindowWidthContext;
