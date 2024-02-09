import "jimp/browser/lib/jimp";
import { JimpType } from "../types/jimp";

import { createContext } from "react";

const NullImageContext = createContext<JimpType>(null);

export default NullImageContext;
