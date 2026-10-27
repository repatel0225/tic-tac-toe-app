export type Player = 'X' | 'O';
export type GameMode = 'TWO_PLAYER' | 'COMPUTER';
export type GameStatus = 'InProgress' | 'Won' | 'Draw';

export interface IMove {
  moveNumber: number;
  player: Player;
  row: number;
  col: number;
  cellIndex: number;
}

export interface IGame {
  _id: string;
  board: (Player | null)[];
  currentPlayer: Player;
  mode: GameMode;
  status: GameStatus;
  winner: Player | null;
  winningCells: number[];
  moves: IMove[];
}

export interface IScoreboard {
  xWins: number;
  oWins: number;
  draws: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

 