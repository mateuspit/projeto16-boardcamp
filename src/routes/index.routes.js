import { Router } from "express";
import gameRouter from "./game.routes.js";
import customersRouter from "./customer.routes.js";

const router = Router(); 
router.use(gameRouter);
router.use(customersRouter);
console.log("router");

export default router;