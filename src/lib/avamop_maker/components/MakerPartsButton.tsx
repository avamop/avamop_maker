import 'jimp/browser/lib/jimp.js'
import React, { Suspense, lazy, useState, useEffect } from 'react';
import type { Jimp } from 'jimp/browser/lib/jimp';

interface MakerPartsButtonProps {
  path: string;
  item: string;
  faces: string;
  buttonImages: PeaceCombined;
  onClick: () => void;
}

interface CombineParts {
  [faces: string]: {
    part: Jimp;
  }
}
interface CombinePartsBase64 {
  [faces: string]: {
    part: string;
  }
}

const SplitCombine = async (buttonImages: PeaceCombined, path: string): Promise<CombinePartsBase64> => {
  const combineParts: CombineParts = {};

  // 各peace内の画像を合成
  for (const peace in buttonImages) {
    const faces = buttonImages[peace].faces;
    for (const face in faces) {
      const facePath = path + faces[face].facePath;

      // 画像を読み込む
      const image = await Jimp.read(facePath);

      // combineParts に face 毎の Jimp インスタンスを格納
      if (!combineParts[face]) {
        combineParts[face] = {
          part: image.clone(),
        };
      } else {
        combineParts[face].part.composite(image, 0, 0);
      }
    }
  }

  // combineParts を base64 形式に変換
  const combinePartsBase64: CombinePartsBase64 = {};
  for (const face in combineParts) {
    const base64Image = await combineParts[face].part.getBase64Async(Jimp.MIME_PNG);
    combinePartsBase64[face] = {
      part: base64Image,
    };
  }

  return combinePartsBase64;
}

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({
  path,
  onClick,
  item,
  faces,
  buttonImages
}) => {
  const [menuPartIcon, setMenuPartIcon] = useState<CombinePartsBase64 | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchMenuPartIcon = async () => {
      try {
        const result = await SplitCombine(buttonImages, path);
        setMenuPartIcon(result);
        setIsLoading(false);
      } catch (error) {
        console.error("パーツデータ読み込みエラー:" + error);
        setIsLoading(false);
      }
    }
    fetchMenuPartIcon();
  }, [buttonImages, path]);

  return (
    <li onClick={onClick}>
      {isLoading ? (<div>Loading...</div>) : (
        <>
          <img src={menuPartIcon ? menuPartIcon[faces ? faces : "normal"].part : ""} alt={item} />
          {item}</>)}
    </li>
  );
};

export default MakerPartsButton;
