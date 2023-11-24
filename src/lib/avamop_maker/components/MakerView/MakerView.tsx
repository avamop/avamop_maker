import React from "react";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerCanvasStatusGen } from "../functions/fetchData/MakerCanvasStatusGen";

interface MakerViewProps {
  SelectedPartss: SelectedParts;
  PartsObjectJimp: PartsObjectJimp;
  selectedFace: string;
}

const MakerView: React.FC<MakerViewProps> = ({
  SelectedPartss,
  PartsObjectJimp,
  selectedFace,
}) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const SelectedPartsForCanvas = MakerCanvasStatusGen(
    SelectedPartss,
    PartsObjectJimp,
    selectedFace
  );

  return (
    <>
      <canvas></canvas> {/*アバター画像を表示する場所*/}
    </>
  );
};

export default MakerView;
