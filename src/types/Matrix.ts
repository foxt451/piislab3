export enum CellContent {
  PLAYER1,
  PLAYER2,
  EMPTY,
}

export type Matrix = CellContent[][];

export type Coords = { x: number; y: number };
