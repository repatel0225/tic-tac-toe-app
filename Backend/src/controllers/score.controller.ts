import { Request, Response, NextFunction } from "express";
import { Scoreboard } from "../models/score.model.js";

/**
 * Retrieves the current scoreboard tally.
 *
 * @route GET /api/scoreboard
 * @param req Express Request
 * @param res Response returning the scoreboard object
 */
export const getScoreboard = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let scoreboard = await Scoreboard.findOne();

    // If no scoreboard exists yet, create an initial zeroed record
    if (!scoreboard) {
      scoreboard = await Scoreboard.create({ xWins: 0, oWins: 0, draws: 0 });
    }

    res.status(200).json({
      success: true,
      data: {
        xWins: scoreboard.xWins,
        oWins: scoreboard.oWins,
        draws: scoreboard.draws,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Resets the scoreboard tally to zero.
 *
 * @route POST /api/scoreboard/reset
 * @param req Express Request
 * @param res Response returning the reset scoreboard object
 */
export const resetScoreboard = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const scoreboard = await Scoreboard.findOneAndUpdate(
      {},
      { xWins: 0, oWins: 0, draws: 0 },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        xWins: scoreboard.xWins,
        oWins: scoreboard.oWins,
        draws: scoreboard.draws,
      },
    });
  } catch (error) {
    next(error);
  }
};