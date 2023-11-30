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
      partFlip: boolean;
      items: Items; //パーツの画像の一覧のオブジェクト
    };
  }
  interface PartsObjectSplit {
    [category: "body" | string]: {
      partCount: number;
      partChain: string;
      ignoreTrigger: null | string[];
      partFlip: boolean;
      partList: CategorySplit; //同じpartChainを部位ごとに分けたオブジェクト。
    };
  }

  interface CategorySplit {
    [partSplit: "body" | string]: {
      //partChainの値が入る。一つのパーツを複数の画像で賄う際のくくりつけたもの
      colorGroup: "eye" | string;
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

  //パーツアイコンを合成するためにPartsObjectを変換したオブジェクト
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
    [face: "normal" | string]: {
      imagePath: string; //パーツアイコンのbase64データ
    };
  }

  interface Faces {
    [face: "normal" | string]: {
      //表情の種類。
      imagePath: string; //表情ごとの画像パス。該当する表情がない場合はnormalのパスを使用する。同じ画像を複数の表情で使う場合は同一のパスを指定する。
    };
  }

  interface ColorsObject {
    [colorName: string]: string;
  }

  interface DefaultColors {
    [category: string]: string;
  }
  interface SelectedParts {
    bodyType: string; //現在選択されているbodyのタイプの数字
    category: {
      [category: string]: SelectedPartsCategory;
    };
  }

  interface SelectedPartsCategory {
    partName: string; //パーツの名前
    partFlip: boolean;
  }

  interface SelectedColor {
    [colorGroup: string]: {
      color: string;
      hueShiftReverse: boolean;
    };
  }

  interface SelectedPartsForCanvas {
    bodyType: string;
    category: {
      [category: string]: SelectedPartsForCanvasCategory;
    };
  }

  interface SelectedPartsForCanvasCategory {
    partOrder: number;
    partData: Jimp; //パーツのJimpデータ
    partFlip: boolean;
  }

  interface categoryIconObject {
    [category: string]: {
      imagePath: string;
    };
  }

  //PartsObjectのパスをJimpデータに置き換えたオブジェクト
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
    [face: "normal" | string]: {
      jimpData: Jimp;
    };
  }
}
