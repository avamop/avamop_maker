interface PartObject {
  [category: string]: Category;
}

interface Category {
  partCount: number;
  partChain: string;
  partOrder: number;
  items: Items;
}

interface Items {
  [item: string]: {
    body: Category["partChain"] extends "body" ? number : number[];
    faces: Faces;
  };
}

interface PartObjectMerged {
  [category: string]: {
    partList: CategoryMerged;
    partCount: number;
    partChain: string;
  };
}

interface CategoryMerged {
  [partSplit: string]: {
    partOrder: number;
    items: ItemsMerged;
  };
}

interface ItemsMerged {
  [item: string]: {
    body: Category["partChain"] extends "body" ? number : number[];
    faces: Faces;
  };
}

interface ConvertPartObject {
  [category: string]: {
    partList: CategoryItemsCombined;
  };
}
interface CategoryItemsCombined {
  [item: string]: {
    body: Category["partChain"] extends "body" ? number : number[];
    peaces: PeaceCombined;
  };
}

interface PeaceCombined {
  [peace: string]: {
    faces: Faces;
  };
}

interface PartObjectBase64 {
  [category: string]: {
    partList: CategoryItemsBase64;
  };
}
interface CategoryItemsBase64 {
  [item: string]: {
    faces: CombinePartsBase64;
  };
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
  [category: string]: {
    partName: string;
    partBody: ViewStatus["category"] extends "body" ? number : number[];
  };
}

interface MenuThumbnail {
  [category: string]: {
    pathUrl: string;
  };
}

interface FaceList {
  face: string;
}
