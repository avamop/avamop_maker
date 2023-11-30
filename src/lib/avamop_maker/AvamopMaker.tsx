import MakerWindow from "./components/MakerWindow";

interface AvamopMakerProps {
  path: string;
  PartsObject: PartsObjectSplit;
  categoryIconObject: categoryIconObject;
  colorsObject: ColorsObject;
  defaultColors: DefaultColors;
}

const AvamopMaker: React.FC<AvamopMakerProps> = ({
  path,
  PartsObject,
  categoryIconObject,
  colorsObject,
  defaultColors,
}) => {
  return (
    <>
      {/*アバターメーカーの枠*/}
      <MakerWindow
        path={path}
        PartsObject={PartsObject}
        categoryIconObject={categoryIconObject}
        colorsObject={colorsObject}
        defaultColors={defaultColors}
      />{" "}
    </>
  );
};

export { AvamopMaker };
