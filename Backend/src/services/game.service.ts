import { Game, IGameDocument } from "../models/game.model.js";
import { Scoreboard } from "../models/score.model.js";
import { calculateComputerMove } from "./ai.service.js";
import { AppError } from "../utils/apiError.js";
import {
  WINNING_COMBINATIONS,
  BOARD_SIZE,
  BOARD_DIMENSION,
  CUSTOM_CODES,
} from "../constants/game.constants.js";
import { Player, GameMode, IMove } from "../types/game.types.js";

/**
 * Checks if there is a winning combination on the board.
 *
 * @param board Current board array of length 9
 * @returns An object containing the winner ('X' | 'O' | null) and winning cell indices
 */
const checkWin = (
  board: (Player | null)[]
): { winner: Player | null; winningCells: number[] } => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningCells: [a, b, c] };
    }
  }
  return { winner: null, winningCells: [] };
};

/**
 * Updates the session scoreboard atomically upon game completion.
 *
 * @param status Final status ('Won' | 'Draw')
 * @param winner Winning player if status is 'Won'
 */
const recordGameOutcome = async (
  status: "Won" | "Draw",
  winner: Player | null
): Promise<void> => {
  const incField =
    status === "Draw"
      ? { draws: 1 }
      : winner === "X"
      ? { xWins: 1 }
      : { oWins: 1 };

  await Scoreboard.findOneAndUpdate(
    {},
    { $inc: incField },
    { upsert: true, new: true }
  );
};

/**
 * Creates and initializes a new game session.
 *
 * @param mode 'TWO_PLAYER' or 'COMPUTER'
 * @returns The newly created game document
 */
export const createGame = async (mode: GameMode = "TWO_PLAYER"): Promise<IGameDocument> => {
  const game = await Game.create({
    board: Array(BOARD_SIZE).fill(null),
    currentPlayer: "X",
    mode,
    status: "InProgress",
    winner: null,
    winningCells: [],
    moves: [],
  });

  return game;
};

/**
 * Retrieves a game session by its MongoDB ObjectId.
 *
 * @param gameId Game ID string
 * @returns The game document
 */
export const getGameById = async (gameId: string): Promise<IGameDocument> => {
  const game = await Game.findById(gameId);
  if (!game) {
    throw new AppError(404, CUSTOM_CODES.GAME_NOT_FOUND.code, CUSTOM_CODES.GAME_NOT_FOUND.message);
  }
  return game;
};

/**
 * Processes a player move, updates status, and triggers computer move if applicable.
 *
 * @param gameId Game ID
 * @param player Moving player ('X' or 'O')
 * @param row Row index (0-2)
 * @param col Column index (0-2)
 * @returns Updated game document
 */
export const makeMove = async (
  gameId: string,
  player: Player,
  row: number,
  col: number
): Promise<IGameDocument> => {
  const game = await getGameById(gameId);

  // Validation 1: Game must be in progress
  if (game.status !== "InProgress") {
    throw new AppError(400, CUSTOM_CODES.GAME_ALREADY_COMPLETED.code, CUSTOM_CODES.GAME_ALREADY_COMPLETED.message);
  }

  // Validation 2: Row and col boundaries
  if (row < 0 || row >= BOARD_DIMENSION || col < 0 || col >= BOARD_DIMENSION) {
    throw new AppError(400, CUSTOM_CODES.INVALID_CELL_INDEX.code, CUSTOM_CODES.INVALID_CELL_INDEX.message);
  }

  const cellIndex = row * BOARD_DIMENSION + col;

  // Validation 3: Target cell must be empty
  if (game.board[cellIndex] !== null) {
    throw new AppError(400, CUSTOM_CODES.CELL_OCCUPIED.code, CUSTOM_CODES.CELL_OCCUPIED.message);
  }

  // Validation 4: Correct player's turn
  if (game.currentPlayer !== player) {
    throw new AppError(400, CUSTOM_CODES.INVALID_PLAYER_TURN.code, CUSTOM_CODES.INVALID_PLAYER_TURN.message);
  }

  // Apply human move
  const updatedBoard = [...game.board];
  updatedBoard[cellIndex] = player;
  game.board = updatedBoard;

  const newMove: IMove = {
    moveNumber: game.moves.length + 1,
    player,
    row,
    col,
    cellIndex,
  };
  game.moves.push(newMove);

  // Check game outcome after the human move
  const { winner, winningCells } = checkWin(game.board);
  const isFull = game.board.every((cell) => cell !== null);

  if (winner) {
    game.status = "Won";
    game.winner = winner;
    game.winningCells = winningCells;
    await recordGameOutcome("Won", winner);
  } else if (isFull) {
    game.status = "Draw";
    await recordGameOutcome("Draw", null);
  } else {
    // Game continues: switch turn
    game.currentPlayer = player === "X" ? "O" : "X";

    // If Computer Mode is active and it's O's turn, execute computer move
    if (game.mode === "COMPUTER" && game.currentPlayer === "O") {
      const aiCellIndex = calculateComputerMove(game.board);

      if (aiCellIndex !== null) {
        const aiRow = Math.floor(aiCellIndex / BOARD_DIMENSION);
        const aiCol = aiCellIndex % BOARD_DIMENSION;

        const aiBoard = [...game.board];
        aiBoard[aiCellIndex] = "O";
        game.board = aiBoard;

        const aiMove: IMove = {
          moveNumber: game.moves.length + 1,
          player: "O",
          row: aiRow,
          col: aiCol,
          cellIndex: aiCellIndex,
        };
        game.moves.push(aiMove);

        // Check outcome after computer move
        const aiOutcome = checkWin(game.board);
        const aiBoardFull = game.board.every((cell) => cell !== null);

        if (aiOutcome.winner) {
          game.status = "Won";
          game.winner = aiOutcome.winner;
          game.winningCells = aiOutcome.winningCells;
          await recordGameOutcome("Won", aiOutcome.winner);
        } else if (aiBoardFull) {
          game.status = "Draw";
          await recordGameOutcome("Draw", null);
        } else {
          game.currentPlayer = "X";
        }
      }
    }
  }

  await game.save();
  return game;
};

/**
 * Reverts the most recent move or move pair based on the game mode (Option A: Disabled when completed).
 *
 * @param gameId Game ID string
 * @returns Game document restored to previous valid state
 */
export const undoMove = async (gameId: string): Promise<IGameDocument> => {
  const game = await getGameById(gameId);

  // Option A enforcement: undo is disabled once game is finished
  if (game.status !== "InProgress") {
    throw new AppError(400, CUSTOM_CODES.UNDO_DISABLED_COMPLETED.code, CUSTOM_CODES.UNDO_DISABLED_COMPLETED.message);
  }

  if (game.moves.length === 0) {
    throw new AppError(400, CUSTOM_CODES.NO_MOVES_TO_UNDO.code, CUSTOM_CODES.NO_MOVES_TO_UNDO.message);
  }

  // In Two Player mode: pop 1 move. In Computer mode: pop 2 moves (O and X).
  const movesToPop = game.mode === "COMPUTER" ? Math.min(2, game.moves.length) : 1;

  for (let i = 0; i < movesToPop; i++) {
    const lastMove = game.moves.pop();
    if (lastMove) {
      game.board[lastMove.cellIndex] = null;
    }
  }

  game.board = [...game.board]; // Trigger change detection
  game.status = "InProgress";
  game.winner = null;
  game.winningCells = [];

  // Determine whose turn it is now based on remaining move count
  game.currentPlayer = game.moves.length % 2 === 0 ? "X" : "O";

  await game.save();
  return game;
};

/**
 * Resets the current game board and history while preserving the game ID and mode.
 *
 * @param gameId Game ID string
 * @returns Reset game document
 */
export const resetGame = async (gameId: string): Promise<IGameDocument> => {
  const game = await getGameById(gameId);

  game.board = Array(BOARD_SIZE).fill(null);
  game.currentPlayer = "X";
  game.status = "InProgress";
  game.winner = null;
  game.winningCells = [];
  game.moves = [];

  await game.save();
  return game;
};