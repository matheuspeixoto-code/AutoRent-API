import { Router } from "express";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAutheticated } from "@shared/infra/http/middlewares/ensureAutheticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";


const specificationRoutes=Router();

const createSpecificationController=new CreateSpecificationController();


specificationRoutes.post("/", 
    ensureAutheticated,
    ensureAdmin,
    createSpecificationController.handle
);

export {specificationRoutes};