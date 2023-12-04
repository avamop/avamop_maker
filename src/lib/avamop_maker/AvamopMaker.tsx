import MakerWindow from "./components/MakerWindow";

interface AvamopMakerProps {
  path: string;
  partsObject: PartsObjectSplit;
  categoryIconObject: categoryIconObject;
  colorsObject: ColorsObject;
  defaultColors: DefaultColors;
}

const AvamopMaker: React.FC<AvamopMakerProps> = ({
  path,
  partsObject,
  categoryIconObject,
  colorsObject,
  defaultColors,
}) => {
  return (
    <>
      {/*アバターメーカーの枠*/}
      <MakerWindow
        path={path}
        partsObject={partsObject}
        categoryIconObject={categoryIconObject}
        colorsObject={colorsObject}
        defaultColors={defaultColors}
      />{" "}
    </>
  );
};

export { AvamopMaker };
