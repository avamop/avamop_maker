import Jimp from "jimp";
interface PartsObjectJimp {
    [category: "body" | string]: {
        partCount: number;
        partChain: string;
        ignoreTrigger: null | string[];
        partList: CategoryJimp;
    };
}
interface CategoryJimp {
    [partSplit: "body" | string]: {
        colorGroup: null | string;
        partOrder: number;
        items: ItemsJimp;
    };
}
interface ItemsJimp {
    [item: string]: {
        bodyType: string[];
        enableColor: boolean;
        faces: FacesJimp;
    };
}
interface FacesJimp {
    [face: "clear" | string]: {
        jimpData: Jimp;
    };
}
declare const MakerGenerateAvaterImage: (partsPath: string, nullImagePath: string, partsObject: PartsObjectSplit, selectedParts: SelectedParts, colorsObject: ColorsObject) => Promise<string>;
export default MakerGenerateAvaterImage;
export declare const MakerConvertPartsJimp: (partsObject: PartsObjectSplit, partsPath: string, nullImage: Jimp, selectedParts: SelectedParts, colorsObject: ColorsObject) => Promise<PartsObjectJimp>;
export declare const MakerPartsColoring: (image: Jimp, partSplit: string, colorGroup: string, selectedParts: SelectedParts, colorsObject: ColorsObject) => Promise<Jimp>;
export declare const MakerLayerCombineParts: (selectedPartsForCanvas: SelectedPartsForCanvas) => Promise<Jimp[]>;
export declare const MakerCanvasSelectedPartsGen: (selectedParts: SelectedParts, partsObjectJimp: PartsObjectJimp, nullImage: Jimp) => SelectedPartsForCanvas;
//# sourceMappingURL=MakerGenerateAvaterImage.d.ts.map