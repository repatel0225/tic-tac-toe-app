import { Router } from "express";
import gameRoutes from "./game.routes.js";
import scoreRoutes from "./score.routes.js";

const router = Router();

router.use("/games", gameRoutes);
router.use("/scoreboard", scoreRoutes);

export default router;