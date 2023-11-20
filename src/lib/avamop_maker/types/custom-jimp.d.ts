declare module "jimp/browser/lib/jimp" {
  import type * as _Jimp from "jimp/types";

  export type Jimp = _Jimp;

  global {
    export var Jimp: typeof _Jimp;
  }
}
