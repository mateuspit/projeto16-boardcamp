import { Router } from "express";
import { postRental, getRentals, finishRental } from "../controllers/rentalController.js";
import validateRentalData from "../middlewares/validateRentalData.js"
import rentalSchema from "../schemas/rentalSchema.js"

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRentalData(rentalSchema), postRental);
rentalsRouter.post("/rentals/:id/return", finishRental)
rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;