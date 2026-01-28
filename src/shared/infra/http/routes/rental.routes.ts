import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAutheticated } from "../middlewares/ensureAutheticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalByUserController";

const rentalRoute = Router()
const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalByUserController = new ListRentalByUserController()

rentalRoute.post("/",
    ensureAutheticated,
    createRentalController.handle
)

rentalRoute.post("/devolution/:id",
    ensureAutheticated,
    devolutionRentalController.handle
)

rentalRoute.get("/user",
    ensureAutheticated,
    listRentalByUserController.handle
)

export {rentalRoute}