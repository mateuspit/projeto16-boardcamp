import { Router } from "express";
import { getCustomers, getCustomersById } from "../controllers/customerController.js";

const customersRouter = Router();

customersRouter.get("/customers/:id", getCustomersById);
customersRouter.get("/customers", getCustomers);
console.log("customersRouter");

export default customersRouter;