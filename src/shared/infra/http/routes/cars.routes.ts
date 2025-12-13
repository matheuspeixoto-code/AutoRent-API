import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

import { ensureAutheticated } from "@shared/infra/http/middlewares/ensureAutheticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsRoutes=Router();
const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

carsRoutes.post("/",
    ensureAutheticated
    ,ensureAdmin,
    createCarController.handle
)

carsRoutes.get("/available", listAvailableCarsController.handle)

export {carsRoutes}