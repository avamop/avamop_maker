interface ObjectStructure {
  [category: string]: {
    [item: string]: {
      partName: string;
    };
  };
}

interface CategoryItems {
  [item: string]: { partName: string };
}

interface ViewStatus {
  [category: string]: {
    partName: string;
  };
}
