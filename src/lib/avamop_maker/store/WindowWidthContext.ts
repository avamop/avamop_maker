import { createContext } from "react";

const WindowWidthContext = createContext<number>(window.innerWidth);

export default WindowWidthContext;
