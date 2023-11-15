type BodyType<T extends "body" | string> = T extends "body"
  ? number
  : 0 | number[];

interface PartObject {
  [category: "body" | string]: {
    colorGroup: string;
    partCount: number;
    partChain: string;
    partOrder: number;
    items: Items<typeof category>;
  };
}
interface PartObjectMerged {
  [category: "body" | string]: {
    colorGroup: "eye" | string;
    partList: CategoryMerged;
    partCount: number;
    partChain: string;
  };
}

interface CategoryMerged {
  [partSplit: "body" | string]: {
    partOrder: number;
    items: Items<typeof partSplit>;
  };
}
interface Items<T extends "body" | string> {
  [item: string]: {
    bodyType: BodyType<T>;
    color: boolean;
    faces: Faces;
  };
}

interface ConvertPartObject {
  [category: "body" | string]: {
    partList: CategoryItemsCombined<typeof category>;
  };
}
interface CategoryItemsCombined<T extends "body" | string> {
  [item: string]: {
    bodyType: BodyType<T>;
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
      [item: string]: CategoryItemsBase64<typeof category>;
    };
  };
}

interface CategoryItemsBase64<T extends "body" | string> {
  bodyType: BodyType<T>;
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
