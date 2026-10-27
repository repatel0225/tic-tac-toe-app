import { Request, Response, NextFunction } from "express";
import * as gameService from "../services/game.service.js";
import { GameMode, Player } from "../types/game.types.js";

/**
 * Handles creation of a new game session.
 *
 * @route POST /api/games
 * @param req Request body containing optional `mode` ('TWO_PLAYER' | 'COMPUTER')
 * @param res Response returning the created game object
 */
export const createGame = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { mode } = req.body as { mode?: GameMode };
    const game = await gameService.createGame(mode || "TWO_PLAYER");
    res.status(201).json({
      success: true,
      data: game,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles fetching current state of a game by its ID.
 *
 * @route GET /api/games/:id
 * @param req Request containing game ID in URL params
 * @param res Response returning the current game state
 */
export const getGameById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const game = await gameService.getGameById(id as string);
    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles submitting a move to a game session.
 *
 * @route POST /api/games/:id/moves
 * @param req Request body containing `player`, `row`, `col` (or `cellIndex`)
 * @param res Response returning the updated game state
 */
export const makeMove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    let { player, row, col, cellIndex } = req.body as {
      player: Player;
      row?: number;
      col?: number;
      cellIndex?: number;
    };

    // Support cellIndex if row/col are not directly provided
    if ((row === undefined || col === undefined) && cellIndex !== undefined) {
      row = Math.floor(cellIndex / 3);
      col = cellIndex % 3;
    }

    const game = await gameService.makeMove(
      id as string,
      player,
      row as number,
      col as number
    );

    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles undoing the last move or move pair.
 *
 * @route POST /api/games/:id/undo
 * @param req Request containing game ID in URL params
 * @param res Response returning game state after undo
 */
export const undoMove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const game = await gameService.undoMove(id as string);
    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles resetting the current game board and move history.
 *
 * @route POST /api/games/:id/reset
 * @param req Request containing game ID in URL params
 * @param res Response returning the cleared game state
 */
export const resetGame = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const game = await gameService.resetGame(id as string);
    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    next(error);
  }
};