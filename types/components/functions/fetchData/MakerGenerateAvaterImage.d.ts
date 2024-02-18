import Jimp from "jimp";
type JimpServer = Jimp;
interface PartsObjectJimpServer {
    [category: "body" | string]: {
        partCount: number;
        partChain: string;
        ignoreTrigger: null | string[];
        partList: CategoryJimpServer;
    };
}
interface CategoryJimpServer {
    [partSplit: "body" | string]: {
        colorGroup: null | string;
        partOrder: number;
        items: ItemsJimpServer;
    };
}
interface ItemsJimpServer {
    [item: string]: {
        bodyType: string[];
        enableColor: boolean;
        faces: FacesJimpServer;
    };
}
interface FacesJimpServer {
    [face: "clear" | string]: {
        jimpData: JimpServer;
    };
}
declare const MakerGenerateAvaterImage: (partsPath: string, nullImagePath: string, partsObject: PartsObjectSplit, selectedParts: SelectedParts, colorsObject: ColorsObject) => Promise<string>;
export default MakerGenerateAvaterImage;
export declare const MakerConvertPartsJimp: (partsObject: PartsObjectSplit, partsPath: string, nullImage: JimpServer, selectedParts: SelectedParts, colorsObject: ColorsObject) => Promise<PartsObjectJimpServer>;
export declare const MakerPartsColoring: (image: JimpServer, partSplit: string, colorGroup: string, selectedParts: SelectedParts, colorsObject: ColorsObject) => Promise<Jimp>;
export declare const MakerLayerCombineParts: (selectedPartsForCanvas: SelectedPartsForCanvas) => Promise<Jimp[]>;
export declare const MakerCanvasSelectedPartsGen: (selectedParts: SelectedParts, partsObjectJimp: PartsObjectJimpServer, nullImage: JimpServer) => SelectedPartsForCanvas;
//# sourceMappingURL=MakerGenerateAvaterImage.d.ts.map