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

interface Faces {
  [face: string]: {
    facePath: string;
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


interface ViewStatus {
  [category: string]: {
    partName: string;
    partBody: ViewStatus["category"] extends "body" ? number : number[];
  };
}

interface MenuThumbnail {
  [category: string]: {
    pathUrl: string;
  }
}
