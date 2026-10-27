import { Schema, model, Document } from "mongoose";
import { IScoreboard } from "../types/game.types.js";

export interface IScoreboardDocument extends IScoreboard, Document {}

const scoreSchema = new Schema<IScoreboardDocument>(
  {
    xWins: { type: Number, default: 0, min: 0 },
    oWins: { type: Number, default: 0, min: 0 },
    draws: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Scoreboard = model<IScoreboardDocument>("Scoreboard", scoreSchema);