import React from "react";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";
import { MakerCanvasStatusGen } from "./functions/MakerCanvasStatusGen";

interface MakerViewProps {
  selectedParts: ViewStatus;
  partObject: PartObjectMerged;
  selectedFace: string;
}

const MakerView: React.FC<MakerViewProps> = ({
  selectedParts,
  partObject,
  selectedFace,
}) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const CanvasObject = MakerCanvasStatusGen(
    selectedParts,
    partObject,
    selectedFace
  );

  return (
    <>
      <canvas></canvas>
    </>
  );
};

export default MakerView;
