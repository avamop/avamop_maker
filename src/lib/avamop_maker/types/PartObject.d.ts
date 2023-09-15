interface PartObject {
  [category: string]: Category
}

interface Category {
  partCount: number;
  partChain: string | null;
  partOrder: number;
  items: Items
}

interface Items {
  [item: string]: Faces
}

interface Faces {
  [face: string]: {
    facePath: string
  }
}

interface ViewStatus {
  [category: string]: {
    partCount: number;
    partChain: string | null;
    partOrder: number;
    partName: string;
  };
}
