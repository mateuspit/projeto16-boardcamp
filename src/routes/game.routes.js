import { Router } from "express";
import { getGames, postGame } from "../controllers/gameController.js";
import validateNewGameSchema from "../middlewares/validateNewGame.js";
import { newGameSchema } from "../schemas/newGameSchema.js";
import validadeQuery from "../middlewares/validadeQuery.js";
import { querSchema } from "../schemas/querySchema.js";

const gameRouter = Router();

gameRouter.get("/games", validadeQuery(querSchema), getGames);
gameRouter.post("/games", validateNewGameSchema(newGameSchema), postGame);

export default gameRouter;