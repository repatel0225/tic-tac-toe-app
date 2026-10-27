import { Router } from "express";
import {
  createGame,
  getGameById,
  makeMove,
  undoMove,
  resetGame,
} from "../controllers/game.controller.js";

const router = Router();

// Route: /api/games
router.route("/").post(createGame);

// Route: /api/games/:id
router.route("/:id").get(getGameById);

// Route: /api/games/:id/moves
router.route("/:id/moves").post(makeMove);

// Route: /api/games/:id/undo
router.route("/:id/undo").post(undoMove);

// Route: /api/games/:id/reset
router.route("/:id/reset").post(resetGame);

export default router;