export type Player = 'X' | 'O';
export type GameMode = 'TWO_PLAYER' | 'COMPUTER';
export type GameStatus = 'InProgress' | 'Won' | 'Draw';

export interface IMove {
  moveNumber: number;
  player: Player;
  row: number;       // 0, 1, or 2
  col: number;       // 0, 1, or 2
  cellIndex: number; // 0 to 8 (row * 3 + col)
}

export interface IGame {
  board: (Player | null)[];  // Array of 9 cells
  currentPlayer: Player;     // 'X' | 'O'
  mode: GameMode;
  status: GameStatus;
  winner: Player | null;
  winningCells: number[];    // Indices of the winning cells, e.g. [0, 1, 2]
  moves: IMove[];
}

export interface IScoreboard {
  xWins: number;
  oWins: number;
  draws: number;
}