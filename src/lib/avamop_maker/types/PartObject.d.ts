import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

declare global {
  interface PartsObject {
    //目や鼻などの部位
    [category: "body" | string]: {
      colorGroup: string; // デフォルトの色を決めるパーツの系統
      partCount: number; //同じ部位のパーツを何個まで重ねがけ出来るか、帽子やメガネやアホ毛といったパーツに使用
      partChain: string; //複数の画像1つのパーツとしてを扱うための仕組み。白目と瞳など
      partOrder: number; //パーツレイヤーを重ねる順番を表したもの
      ignoreTrigger: null | string[]; //特定のカテゴリーのパーツが選ばれた時に連動するカテゴリーのパーツを外す(Tシャツとワンピースなど)
      partFlip: null | boolean;
      items: Items; //パーツの画像の一覧のオブジェクト
    };
  }
  interface PartsObjectSplit {
    [category: "body" | string]: {
      partCount: number;
      partChain: string;
      ignoreTrigger: null | string[];
      partFlip: null | boolean;
      partList: CategorySplit; //同じpartChainを部位ごとに分けたオブジェクト。
    };
  }

  interface CategorySplit {
    [partSplit: "body" | string]: {
      //partChainの値が入る。一つのパーツを複数の画像で賄う際のくくりつけたもの
      colorGroup: string;
      partOrder: number; //同じpartChainを部位ごとに分けたオブジェクト。
      items: Items; //パーツの画像の一覧のオブジェクト。SplitではpartChain→partSplitでくくりつけたことで扱いやすくなっている
    };
  }
  interface Items {
    [item: string]: {
      bodyType: null | string[]; //体パーツのタイプを表している。categoryが体パーツの場合は体のタイプを、それ以外のパーツの場合はどの体タイプに対応してるかを配列で列挙する。nullの場合は全てのbodyに対応している
      color: boolean; //カラーチェンジが有効かどうかを表している
      faces: Faces; //表情差分。この中に画像パスがある。
    };
  }

  //パーツアイコンを合成するためにpartsObjectを変換したオブジェクト
  interface PartsObjectIconForCombine {
    [category: "body" | string]: {
      partList: ItemsIconForCombine;
    };
  }
  interface ItemsIconForCombine {
    [item: string]: {
      bodyType: null | string[];
      peaces: ItemPeacesIconForCombine;
    };
  }

  interface ItemPeacesIconForCombine {
    [peace: string]: {
      faces: FacesJimp;
    };
  }

  //パーツアイコンをbase64に変換したものを格納するオブジェクト
  interface CombinePartIconsObjectBase64 {
    [category: "body" | string]: {
      partList: {
        [item: string]: CombinePartIconsCategoryBase64;
      };
    };
  }

  interface CombinePartIconsCategoryBase64 {
    bodyType: null | string[];
    faces: CombinePartIconBase64;
  }

  interface CombinePartIconBase64 {
    [face: "clear" | string]: {
      imagePath: string; //パーツアイコンのbase64データ
    };
  }

  interface Faces {
    [face: "clear" | string]: {
      //表情の種類。
      imagePath: string; //表情ごとの画像パス。該当する表情がない場合はclearのパスを使用する。同じ画像を複数の表情で使う場合は同一のパスを指定する。
    };
  }

  interface ColorsObject {
    [colorName: string]: string;
  }

  interface DefaultColors {
    [colorGroup: string]: SelectedColor;
  }
  interface SelectedParts {
    bodyType: string; //現在選択されているbodyのタイプの数字
    category: {
      [category: string]: SelectedPartsCategory;
    };
    selectedColor: {
      [colorGroup: string]: SelectedColor;
    }; //選択されている色のオブジェクト
  }

  interface SelectedPartsCategory {
    partName: string; //パーツの名前
    colorGroup: string;
    partFlip: null | boolean;
  }

  interface SelectedColor {
    color: string;
    hueShiftReverse: boolean;
    hueGraph: ColorGraph;
  }

  type Append<Elm, T extends unknown[]> = ((
    arg: Elm,
    ...rest: T
  ) => void) extends (...args: infer T2) => void
    ? T2
    : never;
  type AtLeast<N extends number, T> = AtLeastRec<N, T, T[], []>;
  type AtLeastRec<Num, Elm, T extends unknown[], C extends unknown[]> = {
    0: T;
    1: AtLeastRec<Num, Elm, Append<Elm, T>, Append<unknown, C>>;
  }[C extends { length: Num } ? 0 : 1];

  interface ColorGraph {
    globalSlope: number;
    individualSlope: AtLeast<10, number>;
  }

  interface SelectedPartsForCanvas {
    bodyType: string;
    category: {
      [category: string]: SelectedPartsForCanvasCategory;
    };
    selectedColor: {
      [colorGroup: string]: SelectedColor;
    };
  }

  interface SelectedPartsForCanvasCategory {
    partOrder: number;
    partData: Jimp; //パーツのJimpデータ
    partFlip: null | boolean;
  }

  interface categoryIconObject {
    [category: string]: {
      imagePath: string;
    };
  }

  //partsObjectのパスをJimpデータに置き換えたオブジェクト
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
      colorGroup: string;
      partOrder: number;
      items: ItemsJimp;
    };
  }
  interface ItemsJimp {
    [item: string]: {
      bodyType: null | string[];
      color: boolean;
      faces: FacesJimp;
    };
  }

  interface FacesJimp {
    [face: "clear" | string]: {
      jimpData: Jimp;
    };
  }
}
