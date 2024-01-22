import "jimp/browser/lib/jimp";
import { JimpObject, JimpType } from "../types/jimp";

declare const Jimp: JimpObject;

import { createContext } from "react";

const NullImageContext = createContext<JimpType>(null);

export default NullImageContext;
