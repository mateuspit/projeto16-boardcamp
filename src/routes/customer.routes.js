import { Router } from "express";
import { getCustomers, getCustomersById, postCustomer, attCustomer } from "../controllers/customerController.js";
import validateNewCustomer from "../middlewares/validateNewCustomer.js";
import { newCustomerSchema } from "../schemas/newCustomerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers/:id", getCustomersById);
customersRouter.get("/customers", getCustomers);
customersRouter.post("/customers", validateNewCustomer(newCustomerSchema), postCustomer);
customersRouter.put("customers/:id", validateNewCustomer(newCustomerSchema), attCustomer);
console.log("customersRouter");

export default customersRouter;