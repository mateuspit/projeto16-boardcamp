import { Router } from "express";
import { postRental } from "../controllers/rentalController.js";
import validateRentalData from "../middlewares/validateRentalData.js"
import rentalSchema from "../schemas/rentalSchema.js"

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRentalData(rentalSchema), postRental);

export default rentalsRouter;