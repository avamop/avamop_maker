import { createContext } from "react";

const MenuPartIconsContext = createContext<{
  menuPartIcons: MenuPartIconsBase64;
  setMenuPartIcons: React.Dispatch<React.SetStateAction<MenuPartIconsBase64>>;
}>(null);

export default MenuPartIconsContext;
