import { useContext } from "react";
import { createRoot } from 'react-dom/client'
import { Box } from "@chakra-ui/react"
import MakerMenu from "./MakerMenu"

const AvamopMaker = (path, objectStructure, order) => {
  return (
    <Box bg='gray.50'>
      <MakerMenu path={path} objectStructure={objectStructure} />
    </Box>
  )
}

export { AvamopMaker }
