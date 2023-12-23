import "jimp/browser/lib/jimp";
import type { Jimp } from "jimp/browser/lib/jimp";

declare global {
  interface PartsObject {
    //変換前のパーツのパス格納オブジェクト
    //目や鼻などの部位
    [category: "body" | string]: {
      colorGroup: null | string; // デフォルトの色を決めるパーツの系統
      partCount: number; //同じ部位のパーツを何個まで重ねがけ出来るか、帽子やメガネやアホ毛といったパーツに使用
      partChain: string; //複数の画像1つのパーツとしてを扱うための仕組み。白目と瞳など
      partOrder: number; //パーツレイヤーを重ねる順番を表したもの
      ignoreTrigger: null | string[]; //特定のカテゴリーのパーツが選ばれた時に連動するカテゴリーのパーツを外す(Tシャツとワンピースなど)
      partFlip: boolean; //パーツの左右反転の可否
      items: Items; //パーツの画像の一覧のオブジェクト
    };
  }
  interface PartsObjectSplit {
    //Makerで利用できる形式に変換したパーツのパス格納オブジェクト
    [category: "body" | string]: {
      partCount: number;
      partChain: string;
      ignoreTrigger: null | string[];
      partFlip: boolean;
      partList: CategorySplit; //同じpartChainを部位ごとに分けたオブジェクト。
    };
  }

  interface CategorySplit {
    //パーツのパス格納オブジェクトのカテゴリ部
    [partSplit: "body" | string]: {
      //partChainの値が入る。一つのパーツを複数の画像で賄う際のくくりつけたもの
      colorGroup: null | string;
      partOrder: number; //同じpartChainを部位ごとに分けたオブジェクト。
      items: Items; //パーツの画像の一覧のオブジェクト。SplitではpartChain→partSplitでくくりつけたことで扱いやすくなっている
    };
  }
  interface Items {
    //変換前及び変換後のパーツのパス格納オブジェクトのパーツリスト部
    [item: string]: {
      bodyType: null | string[]; //体パーツのタイプを表している。categoryが体パーツの場合は体のタイプを、それ以外のパーツの場合はどの体タイプに対応してるかを配列で列挙する。nullの場合は全てのbodyに対応している
      enableColor: boolean; //カラーチェンジが有効かどうかを表している
      faces: Faces; //表情差分。この中に画像パスがある。
    };
  }

  interface Faces {
    //変換前及び変換後のパーツのパス格納オブジェクトのパーツリスト部
    [face: "clear" | string]: {
      //表情の種類。
      imagePath: string; //表情ごとの画像パス。該当する表情がない場合はclearのパスを使用する。同じ画像を複数の表情で使う場合は同一のパスを指定する。
    };
  }

  interface ColorsObject {
    //使用できる色の一覧、バックエンドではなくフロントのローカル内保存
    [colorName: string]: string;
  }

  interface DefaultColors {
    //アバターのカテゴリごとのデフォルトカラー格納オブジェクト、バックエンドではなくフロントのローカル内保存
    [colorGroup: string]: SelectedColor;
  }
  interface SelectedParts {
    //アバターの組み合わせデータのオブジェクト
    bodyType: string;
    face: string; //現在選択されているbodyのタイプの数字
    category: {
      [category: string]: SelectedPartsCategory;
    };
    selectedColor: {
      [colorGroup: string]: SelectedColor;
    }; //選択されている色のオブジェクト
    selectedFace: {
      [category: string]: string;
    };
  }

  interface SelectedPartsCategory {
    //SelectedPartsのカテゴリ部
    partName: string; //パーツの名前
    partFlip: null | boolean;
  }

  interface SelectedColor {
    //SelectedPartsの色データ格納オブジェクト
    [partIndividual: "default" | string]: {
      color: string;
      hueShiftReverse: boolean;
      saturationReverse: boolean;
      hueGraph: ColorGraph;
      saturationGraph: ColorGraph;
      valueGraph: ColorGraph;
    };
  }

  interface SelectedPartsForCanvas {
    bodyType: string;
    face: string;
    category: SelectedPartsForCanvasCategory;
    selectedColor: {
      [colorGroup: string]: SelectedColor;
    };
    selectedFace: {
      [category: string]: string;
    };
  }

  interface SelectedPartsForCanvasCategory {
    [category: string]: {
      partSplit: SelectedPartsForCanvasSplit;
      partFlip: null | boolean;
    };
  }

  interface SelectedPartsForCanvasSplit {
    [partSplit: string]: {
      enableColor: boolean; //色チェンジが有効かどうかを表している
      colorGroup: null | string;
      partOrder: number;
      partData: Jimp; //パーツのJimpデータ
    };
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
  }[C extends { length: Num } ? 0 : 1]; //要素数を制限するnumber[]型

  interface ColorGraph {
    globalSlope: number; //色の推移幅、グラフの傾き
    individualSlope: AtLeast<10, number>; //グラフの形状を変更した際に、globaleSlopeに加算・減算する値、number[]型の要素数を10に制限する
  }

  //パーツアイコンを合成するためにpartsObjectを変換したオブジェクト
  interface PartsObjectIconForCombine {
    [category: "body" | string]: {
      partList: ItemIconsForCombine;
    };
  }
  interface ItemIconsForCombine {
    [item: string]: {
      bodyType: null | string[];
      peaces: ItemPeacesIconForCombine;
    };
  }

  interface ItemPeacesIconForCombine {
    [peace: string]: {
      partOrder: number;
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

  interface faceTree {
    face: string;
    children: faceTree[];
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
      colorGroup: null | string;
      partOrder: number;
      items: ItemsJimp;
    };
  }
  interface ItemsJimp {
    [item: string]: {
      bodyType: null | string[];
      enableColor: boolean;
      faces: FacesJimp;
    };
  }

  interface FacesJimp {
    [face: "clear" | string]: {
      jimpData: Jimp;
    };
  }
}
