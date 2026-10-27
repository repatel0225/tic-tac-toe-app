import { Player } from "../types/game.types.js";
import {
  WINNING_COMBINATIONS,
  CENTER_CELL,
  CORNER_CELLS,
} from "../constants/game.constants.js";

/**
 * Finds a move that completes a line for a given player, if one exists.
 *
 * @param board Current 9-cell board state
 * @param player The player ('X' or 'O') to check for winning/blocking opportunity
 * @returns The winning/blocking cell index (0-8) or null if no immediate win is possible
 */
const findWinningMove = (board: (Player | null)[], player: Player): number | null => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    const line = [board[a], board[b], board[c]];
    const countPlayer = line.filter((cell) => cell === player).length;
    const countEmpty = line.filter((cell) => cell === null).length;

    // Two cells occupied by the target player and one cell empty
    if (countPlayer === 2 && countEmpty === 1) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }
  return null;
};

/**
 * Calculates the next best move for the computer player ('O') based on strict priority.
 * 
 * Priority Rules:
 * 1. If O can win, play the winning move.
 * 2. If X can win next, block X.
 * 3. Take center if available.
 * 4. Take a corner if available.
 * 5. Take any available cell.
 *
 * @param board Current 9-cell board state
 * @returns Cell index (0 to 8) for the computer's move, or null if board is full
 */
export const calculateComputerMove = (board: (Player | null)[]): number | null => {
  // Priority 1: Check if 'O' can win immediately
  const winMove = findWinningMove(board, "O");
  if (winMove !== null) return winMove;

  // Priority 2: Check if 'X' has a winning move and block it
  const blockMove = findWinningMove(board, "X");
  if (blockMove !== null) return blockMove;

  // Priority 3: Take center (cell 4) if available
  if (board[CENTER_CELL] === null) {
    return CENTER_CELL;
  }

  // Priority 4: Take the first available corner [0, 2, 6, 8]
  const availableCorner = CORNER_CELLS.find((index) => board[index] === null);
  if (availableCorner !== undefined) {
    return availableCorner;
  }

  // Priority 5: Take any remaining available cell
  const openIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((idx): idx is number => idx !== null);

  return openIndices.length > 0 ? openIndices[0] : null;
};