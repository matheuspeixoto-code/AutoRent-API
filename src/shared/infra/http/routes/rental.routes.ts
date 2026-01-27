import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAutheticated } from "../middlewares/ensureAutheticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

const rentalRoute = Router()
const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalRoute.post("/",
    ensureAutheticated,
    createRentalController.handle
)

rentalRoute.post("/devolution/:id",
    ensureAutheticated,
    devolutionRentalController.handle
)

export {rentalRoute}