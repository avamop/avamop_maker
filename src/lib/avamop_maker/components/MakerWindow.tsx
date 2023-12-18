import React from "react";
import MakerView from "./MakerView/MakerView";
import MakerPartsMenu from "./makerMenu/MakerPartsMenu";
import MakerFaceMenu from "./makerMenu/MakerFaceListMenu";
import MakerColorsMenu from "./makerMenu/MakerColorsMenu";

const MakerWindow: React.FC = ({}) => {
  return (
    <div>
      <MakerColorsMenu />
      {/* アバターメーカーのアバター表示部分 */}
      <MakerView />
      {/* アバターメーカーの表情メニュー部分 */}
      <MakerFaceMenu />
      {/* アバターメーカーのパーツメニュー部分 */}
      <MakerPartsMenu />
    </div>
  );
};

export default React.memo(MakerWindow);
