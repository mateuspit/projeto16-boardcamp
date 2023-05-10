import { Router } from "express";
import { getGames, postGame } from "../controllers/gameController.js";
import validateNewGameSchema from "../middlewares/validateNewGame.js";
import { newGameSchema } from "../schemas/newGameSchema.js";

const gameRouter = Router();

gameRouter.get("/games/:name/:order/:offset", getGames);
//gameRouter.get("/games/:name/:order/:offset", getGameByFilter);
gameRouter.post("/games", validateNewGameSchema(newGameSchema), postGame);
//console.log("game routes");

export default gameRouter;