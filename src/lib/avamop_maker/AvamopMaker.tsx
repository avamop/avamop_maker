import MakerWindow from "./components/MakerWindow";
import styles from "./module-css/makerMenu/AvamopMaker.module.css"

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
      <div className={styles['Makerwindow']}>
      <MakerWindow
        path={path}
        partsObject={partsObject}
        categoryIconObject={categoryIconObject}
        colorsObject={colorsObject}
        defaultColors={defaultColors}
      />{" "}
      </div>
    </>
  );
};

export { AvamopMaker };
