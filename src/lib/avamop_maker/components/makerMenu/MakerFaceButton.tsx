import React from "react";
import styles from "../../module-css/makerMenu/MakerFaceButton.module.css"; // CSSファイルをインポート

interface MakerFaceButtonProps {
  face: string;
  faceImage: string;
  onClick: () => void;
}

const MakerFaceButton: React.FC<MakerFaceButtonProps> = ({
  face,
  faceImage,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      <button className={styles["maker-face-button"]}>
        <img src={faceImage} alt={face} />
      </button>
    </li>
  );
};

export default MakerFaceButton;
