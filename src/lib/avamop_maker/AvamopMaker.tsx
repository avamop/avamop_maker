import MakerWindow from "./components/MakerWindow";

interface AvamopMakerProps {
  path: string;
  PartsObject: PartsObjectSplit;
  categoryIconObject: categoryIconObject;
}

const AvamopMaker: React.FC<AvamopMakerProps> = ({
  path,
  PartsObject,
  categoryIconObject,
}) => {
  return (
    <>
      {/*アバターメーカーの枠*/}
      <MakerWindow
        path={path}
        PartsObject={PartsObject}
        categoryIconObject={categoryIconObject}
      />{" "}
    </>
  );
};

export { AvamopMaker };
