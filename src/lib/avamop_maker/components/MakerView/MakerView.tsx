import React from "react";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerCanvasStatusGen } from "../functions/fetchData/MakerCanvasStatusGen";

interface MakerViewProps {
  selectedParts: ViewStatus;
  partObjectJimp: PartObjectJimp;
  selectedFace: string;
}

const MakerView: React.FC<MakerViewProps> = ({
  selectedParts,
  partObjectJimp,
  selectedFace,
}) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const CanvasObject = MakerCanvasStatusGen(
    selectedParts,
    partObjectJimp,
    selectedFace
  );

  return (
    <>
      <canvas></canvas> {/*アバター画像を表示する場所*/}
    </>
  );
};

export default MakerView;
