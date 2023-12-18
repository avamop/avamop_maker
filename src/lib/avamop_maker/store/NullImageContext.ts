import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

import { createContext } from "react";

const NullImageContext = createContext<Jimp>(null);

export default NullImageContext;
