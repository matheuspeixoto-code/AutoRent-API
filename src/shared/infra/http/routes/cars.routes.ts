import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

import { ensureAutheticated } from "@shared/infra/http/middlewares/ensureAutheticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const carsRoutes=Router();
const createCarController = new CreateCarController()

carsRoutes.post("/",
    ensureAutheticated
    ,ensureAdmin,
    createCarController.handle)

export {carsRoutes}