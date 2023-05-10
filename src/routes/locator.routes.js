import { Router } from "express";
import { getGames } from "../controllers/locatorController.js";

const locatorRouter = Router();

locatorRouter.get("/games", getGames);
//console.log("locator routes");

export default locatorRouter;