import { Router } from "express";
import locatorRouter from "./locator.routes.js";

const router = Router(); 
router.use(locatorRouter);

export default router;