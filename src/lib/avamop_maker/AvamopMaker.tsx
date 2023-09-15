import { Box } from "@chakra-ui/react"
import MakerMenu from "./components/MakerMenu"

interface AvamopMakerProps {
  path: string;
  partObject: PartObject;
}

const AvamopMaker: React.FC<AvamopMakerProps> = ({ path, partObject }) => {// 配列をpartOrderの値でソート

  let partObjectSorted = {}

  let partObjectSortedKeys = Object.keys(partObject).sort((a, b) => partObject[a].partOrder - partObject[b].partOrder)

  partObjectSortedKeys.forEach((key) => {
    partObjectSorted[key] = partObject[key];
  });

  return (
    <Box bg='gray.50'>
      <MakerMenu path={path} partObject={partObjectSorted} />
    </Box>
  )
}

export { AvamopMaker }
