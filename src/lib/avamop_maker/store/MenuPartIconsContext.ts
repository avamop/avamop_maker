import { createContext } from "react";

const MenuPartIconsContext = createContext<{
  menuPartIcons: CombinePartIconsObjectBase64;
  setMenuPartIcons: React.Dispatch<
    React.SetStateAction<CombinePartIconsObjectBase64>
  >;
}>(null);

export default MenuPartIconsContext;
