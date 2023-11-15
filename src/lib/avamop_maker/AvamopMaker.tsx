import { Box } from "@chakra-ui/react";
import MakerWindow from "./components/MakerWindow";

interface AvamopMakerProps {
  path: string;
  partObject: PartObjectMerged;
  thumbnailObject: MenuThumbnail;
}

const AvamopMaker: React.FC<AvamopMakerProps> = ({
  path,
  partObject,
  thumbnailObject,
}) => {
  return (
    <Box bg="gray.50">
      <MakerWindow
        path={path}
        partObject={partObject}
        thumbnailObject={thumbnailObject}
      />
    </Box>
  );
};

export { AvamopMaker };
