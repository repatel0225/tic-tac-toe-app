import { Schema, model, Document } from "mongoose";
import { IGame, IMove } from "../types/game.types.js";

export interface IGameDocument extends IGame, Document {}

const moveSchema = new Schema<IMove>(
  {
    moveNumber: { type: Number, required: true },
    player: { type: String, enum: ["X", "O"], required: true },
    row: { type: Number, required: true, min: 0, max: 2 },
    col: { type: Number, required: true, min: 0, max: 2 },
    cellIndex: { type: Number, required: true, min: 0, max: 8 },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } }
);

const gameSchema = new Schema<IGameDocument>(
  {
    board: {
      type: [String],
      default: () => Array(9).fill(null),
      validate: [
        (board: (string | null)[]) => board.length === 9,
        "Board must contain exactly 9 cells",
      ],
    },
    currentPlayer: {
      type: String,
      enum: ["X", "O"],
      default: "X",
    },
    mode: {
      type: String,
      enum: ["TWO_PLAYER", "COMPUTER"],
      default: "TWO_PLAYER",
    },
    status: {
      type: String,
      enum: ["InProgress", "Won", "Draw"],
      default: "InProgress",
    },
    winner: {
      type: String,
      enum: ["X", "O", null],
      default: null,
    },
    winningCells: {
      type: [Number],
      default: [],
    },
    moves: {
      type: [moveSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Game = model<IGameDocument>("Game", gameSchema);