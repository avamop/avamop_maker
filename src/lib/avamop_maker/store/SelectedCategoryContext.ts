import { Dispatch, SetStateAction, createContext } from "react";

const SelectedCategoryContext = createContext<{
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}>(null);

export default SelectedCategoryContext;
