import React from "react";
import "../../module-css/makerMenu/MakerPartsButton.module.css";

interface MakerPartsButtonProps {
  item: string;
  buttonImage: string;
  onClick: () => void;
}

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({
  onClick,
  item,
  buttonImage,
}) => {
  return (
    <li className="parts" onClick={onClick}>
      {/* パーツ画像 */}
      <img src={buttonImage} alt={item} />
      {item}
    </li>
  );
};

export default React.memo(MakerPartsButton);
