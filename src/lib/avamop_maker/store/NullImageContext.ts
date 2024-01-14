import Jimp from "jimp/browser/lib/jimp";
import { JimpObject } from "../types/jimp";

import { createContext } from "react";

const NullImageContext = createContext<Jimp>(null);

export default NullImageContext;
