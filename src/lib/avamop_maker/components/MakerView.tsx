import React from "react";
import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

interface MakerViewProps {
  viewStatus;
}

const MakerView = () => {
  return (
    <>
      <canvas></canvas>
    </>
  );
};

export default MakerView;
