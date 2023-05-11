import { Router } from "express";
import { getGames, postGame } from "../controllers/gameController.js";
import validateNewGameSchema from "../middlewares/validateNewGame.js";
import { newGameSchema } from "../schemas/newGameSchema.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", validateNewGameSchema(newGameSchema), postGame);

export default gameRouter;