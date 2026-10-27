import { Player } from "../types/game.types.js";

/**
 * Grid layout dimension (3x3 grid)
 */
export const BOARD_DIMENSION = 3;

/**
 * Total number of cells on the board
 */
export const BOARD_SIZE = 9;

/**
 * All 8 valid winning triplet combinations (rows, columns, diagonals)
 */
export const WINNING_COMBINATIONS: ReadonlyArray<readonly [number, number, number]> = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Center cell index for AI move priority
 */
export const CENTER_CELL = 4;

/**
 * Corner cell indices for AI move priority
 */
export const CORNER_CELLS: ReadonlyArray<number> = [0, 2, 6, 8];

/**
 * Application-wide custom status codes & error messages
 */
export const CUSTOM_CODES = {
  GAME_NOT_FOUND: {
    code: "GAME_NOT_FOUND",
    message: "Game session not found with the provided ID.",
  },
  INVALID_CELL_INDEX: {
    code: "INVALID_CELL_INDEX",
    message: "Invalid move coordinates. Row and column must be between 0 and 2.",
  },
  CELL_OCCUPIED: {
    code: "CELL_OCCUPIED",
    message: "Selected cell is already occupied.",
  },
  GAME_ALREADY_COMPLETED: {
    code: "GAME_ALREADY_COMPLETED",
    message: "Game is already finished. No further moves can be played.",
  },
  INVALID_PLAYER_TURN: {
    code: "INVALID_PLAYER_TURN",
    message: "It is not this player's turn to move.",
  },
  NO_MOVES_TO_UNDO: {
    code: "NO_MOVES_TO_UNDO",
    message: "There are no moves to undo.",
  },
  UNDO_DISABLED_COMPLETED: {
    code: "UNDO_DISABLED_COMPLETED",
    message: "Cannot undo a completed game.",
  },
} as const;

/**
 * Default initial board state (all 9 cells empty)
 */
export const INITIAL_BOARD: ReadonlyArray<Player | null> = Array(BOARD_SIZE).fill(null);