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

interface ConvertPartObject {
  [category: "body" | string]: {
    partList: CategoryItemsCombined;
  };
}
interface CategoryItemsCombined {
  [item: string]: {
    bodyType: null | number[];
    peaces: PeaceCombined;
  };
}

interface PeaceCombined {
  [peace: string]: {
    faces: Faces;
  };
}

interface PartObjectBase64 {
  [category: "body" | string]: {
    partList: {
      [item: string]: CategoryItemsBase64;
    };
  };
}

interface CategoryItemsBase64 {
  bodyType: null | number[];
  faces: CombinePartsBase64;
}

interface CombinePartsBase64 {
  [face: "normal" | string]: {
    part: string;
  };
}

interface Faces {
  [face: "normal" | string]: {
    facePath: string;
  };
}
interface ViewStatus {
  bodyType: number;
  category: {
    [category: string]: ViewStatusCategory<typeof category>;
  };
}

type eyes = { left: string; right: string };

type PartColor<U extends "eye" | string> = U extends "eye" ? eyes : string;

interface ViewStatusCategory<U extends "eye" | string> {
  colorGroup: U;
  partName: string;
  partColor: PartColor<U>;
}

interface MenuThumbnail {
  [category: string]: {
    pathUrl: string;
  };
}
