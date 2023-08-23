import { useEffect, useContext, useRef } from "react";
import { Box } from "@chakra-ui/react"
import MakerMenu from "./MakerMenu"
import { MakerPartsDataImporter } from "./MakerPartsDataImporter";

const MakerWindow = () => {
  return (
    <Box bg='gray.50'>
      <MakerMenu path="../../../../assets/parts/" objectStructure={useContext(MakerPartsDataImporter)} />
    </Box>
  )
}

export default MakerWindow
