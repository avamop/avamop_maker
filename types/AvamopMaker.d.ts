import "jimp/browser/lib/jimp";
interface AvamopMakerProps {
    partsPath: string;
    facePath: string;
    partsObject: PartsObjectSplit;
    colorsObject: ColorsObject;
    defaultColors: DefaultColors;
    defaultAvaters?: SelectedParts;
    facePresets: FaceTree;
    nullImagePath: string;
}
declare const AvamopMaker: React.FC<AvamopMakerProps>;
export default AvamopMaker;
//# sourceMappingURL=AvamopMaker.d.ts.map