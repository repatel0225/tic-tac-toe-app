import { Router } from "express";
import {
  getScoreboard,
  resetScoreboard,
} from "../controllers/score.controller.js";

const router = Router();

// Route: /api/scoreboard
router.route("/").get(getScoreboard);

// Route: /api/scoreboard/reset
router.route("/reset").post(resetScoreboard);

export default router;