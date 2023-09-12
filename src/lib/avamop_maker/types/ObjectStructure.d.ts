interface ObjectStructure {
  [category: string]: {
    partCount: number;
    partChain: string | null;
    partOrder: number;
    items: {
      [item: string]: {
        partName: string;
      };
    };
  };
}

interface CategoryItems {
  [item: string]: { partName: string };
}

interface ViewStatus {
  [category: string]: {
    partCount: number;
    partChain: string | null;
    partOrder: number;
    partName: string;
  };
}
