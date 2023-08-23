import * as React from "react";
interface ObjectStructure {
  [category: string]: {
    [partName: string]: string;
  };
}
export const MakerPartsDataImporter: React.Context<ObjectStructure> = React.createContext<ObjectStructure>({
  "backhairfront": {
    "backhairfront1": "backhairfront/backhairfront1.png"
  },
  "backhairunder": {
    "backhairunder1": "backhairunder/backhairunder1.png"
  },
  "body": {
    "body1": "body/body1.png"
  },
  "ear": {
    "ear1": "ear/ear1.png"
  },
  "eye": {
    "eye1": "eye/eye1.png"
  },
  "eyebrows": {
    "eyebrows1": "eyebrows/eyebrows1.png"
  },
  "fronthair": {
    "fronthair1": "fronthair/fronthair1.png"
  },
  "frontsidehair": {
    "frontsidehair1": "frontsidehair/frontsidehair1.png"
  },
  "head": {
    "head": "head/head.png"
  },
  "mouth": {
    "mouth1": "mouth/mouth1.png"
  },
  "nose": {
    "nose1": "nose/nose1.png"
  }
})
