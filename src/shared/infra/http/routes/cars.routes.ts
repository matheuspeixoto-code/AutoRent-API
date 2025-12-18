import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import  multer  from "multer";

import { ensureAutheticated } from "@shared/infra/http/middlewares/ensureAutheticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationsController } from "@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import uploadConfig from "@config/upload";

const carsRoutes=Router();
const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationsController = new CreateCarSpecificationsController()
const uploadCarImageController = new UploadCarImagesController()


const upload=multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post("/",
    ensureAutheticated
    ,ensureAdmin,
    createCarController.handle
)


carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id",
    ensureAutheticated,
    ensureAdmin,
    createCarSpecificationsController.handle
)

carsRoutes.post("/specifications/:id",
    ensureAutheticated,
    ensureAdmin,
    createCarSpecificationsController.handle
)

carsRoutes.post("/images/:id", 
    ensureAutheticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImageController.handle

)

export {carsRoutes}