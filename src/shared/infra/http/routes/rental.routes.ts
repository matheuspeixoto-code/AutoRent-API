import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAutheticated } from "../middlewares/ensureAutheticated";

const rentalRoute = Router()
const createRentalController = new CreateRentalController()

rentalRoute.post("/",
    ensureAutheticated,
    createRentalController.handle
)

export {rentalRoute}