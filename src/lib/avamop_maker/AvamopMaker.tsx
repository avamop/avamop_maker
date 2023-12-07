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
    <div className={styles['Makerwindow']}>
      {/*アバターメーカーの枠*/}
      
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
