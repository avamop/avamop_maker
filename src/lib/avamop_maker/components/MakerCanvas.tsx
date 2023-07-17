import { useEffect, useRef } from "react";
import { chakra, Box } from "@chakra-ui/react"

const Canvas = chakra("canvas")
const MakerCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("objectがnull");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("context取得失敗");
    }
    // 黒い長方形を描画する
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(0, 0, ctx.canvas.width / 2, ctx.canvas.height / 2);
  }, []);
  return (
    <Box>
      <Canvas border='1px' ref={canvasRef} w={640} h={720}></Canvas>
    </Box>
  )
}

export default MakerCanvas
