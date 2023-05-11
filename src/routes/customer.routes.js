import { Router } from "express";
import { getCustomers, getCustomersById, postCustomer } from "../controllers/customerController.js";
import validateNewCustomer from "../middlewares/validateNewCustomer.js";
import { newCustomerSchema } from "../schemas/newCustomerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers/:id", getCustomersById);
customersRouter.get("/customers", getCustomers);
customersRouter.post("/customers", validateNewCustomer(newCustomerSchema), postCustomer)
console.log("customersRouter");

export default customersRouter;