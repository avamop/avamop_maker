import 'jimp/browser/lib/jimp.js'
import React from 'react'
import type { Jimp } from 'jimp/browser/lib/jimp';
import { useEffect, useState } from 'react'

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

const MakerPartsButton: React.FC<MakerPartsButtonProps> = ({
  path,
  onClick,
  item,
  faces,
  buttonImages
}) => {
  const SplitCombine = async (buttonImages: PeaceCombined): Promise<CombinePartsBase64> => {
    let combineParts: CombineParts = {}
    let combinePartsBase64: CombinePartsBase64 = {}
    for (const partSplit in buttonImages.peaces) {
      for (const faces in buttonImages.peaces[partSplit]) {
        const part = buttonImages.peaces[partSplit].faces[faces];
        const image = await Jimp.read(path + part.faces[faces].facePath);
        if (combineParts.hasOwnProperty(faces)) {
          combineParts[faces].part.composite(image, 0, 0);
        } else {
          combineParts[faces] = { part: image };
        }
      }
      for (const faces in combineParts) {
        combinePartsBase64[faces] = { part: await combineParts[faces].part.getBase64Async(Jimp.MIME_PNG) };
      }
      // console.log('%o', combinePartBase64)
      return combinePartsBase64
    }
  }
  const [menuPartIcon, setMenuPartIcon] = useState<CombinePartsBase64 | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: CombinePartsBase64 = await SplitCombine(buttonImages);
        setMenuPartIcon(result);
        setIsLoading(false); // データの読み込みが完了
      } catch (error) {
        // エラーハンドリング
        console.error(error);
      }
    };

    fetchData();
  }, [buttonImages]);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <li onClick={onClick}>
        <img src={menuPartIcon[faces ? faces : "normal"].part} /> {item}
      </li>
    </React.Suspense>
  );
};

export default MakerPartsButton;
