import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

declare global {
  interface PartObject {
    [category: "body" | string]: {
      colorGroup: string;
      partCount: number;
      partChain: string;
      partOrder: number;
      ignoreTrigger: null | string[];
      items: Items;
    };
  }
  interface PartObjectMerged {
    [category: "body" | string]: {
      colorGroup: "eye" | string;
      partCount: number;
      partChain: string;
      ignoreTrigger: null | string[];
      partList: CategoryMerged;
    };
  }

  interface CategoryMerged {
    [partSplit: "body" | string]: {
      partOrder: number;
      items: Items;
    };
  }
  interface Items {
    [item: string]: {
      bodyType: null | number[];
      color: boolean;
      faces: Faces;
    };
  }

  interface PartObjectForCombine {
    [category: "body" | string]: {
      partList: ItemsForCombine;
    };
  }
  interface ItemsForCombine {
    [item: string]: {
      bodyType: null | number[];
      peaces: ItemPeacesForCombine;
    };
  }

  interface ItemPeacesForCombine {
    [peace: string]: {
      faces: FacesJimp;
    };
  }

  interface FacesForCombine {
    [face: "normal" | string]: {
      icon: string;
    };
  }

  interface CombinePartIconsObjectBase64 {
    [category: "body" | string]: {
      partList: {
        [item: string]: CombinePartIconsCategoryBase64;
      };
    };
  }

  interface CombinePartIconsCategoryBase64 {
    bodyType: null | number[];
    faces: CombinePartIconBase64;
  }

  interface CombinePartIconBase64 {
    [face: "normal" | string]: {
      partBase64: string;
    };
  }

  interface Faces {
    [face: "normal" | string]: {
      facePath: string;
    };
  }

  type eyes = { left: string; right: string };

  type PartColor<U extends "eye" | string> = U extends "eye" ? eyes : string;
  interface ViewStatus {
    bodyType: number;
    category: {
      [category: string]: ViewStatusCategory<typeof category>;
    };
  }

  interface ViewStatusCategory<U extends "eye" | string> {
    colorGroup: U;
    partName: string;
    partColor: PartColor<U>;
  }

  interface CanvasObject {
    bodyType: number;
    category: {
      [category: string]: CanvasObjectCategory<typeof category>;
    };
  }

  interface CanvasObjectCategory<U extends "eye" | string> {
    partOrder: number;
    colorGroup: U;
    partData: Jimp;
    partColor: PartColor<U>;
  }

  interface MenuThumbnail {
    [category: string]: {
      pathUrl: string;
    };
  }

  interface PartObjectJimp {
    [category: "body" | string]: {
      colorGroup: "eye" | string;
      partCount: number;
      partChain: string;
      ignoreTrigger: null | string[];
      partList: CategoryJimp;
    };
  }

  interface CategoryJimp {
    [partSplit: "body" | string]: {
      partOrder: number;
      items: ItemsJimp;
    };
  }
  interface ItemsJimp {
    [item: string]: {
      bodyType: null | number[];
      color: boolean;
      faces: FacesJimp;
    };
  }

  interface FacesJimp {
    [face: "normal" | string]: {
      jimpData: Jimp;
    };
  }
}
