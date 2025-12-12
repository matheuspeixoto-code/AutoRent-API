import {request, response, Router} from "express";
import { ListCategoryController } from "@modules/cars/useCases/listCategorys/ListCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";

import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ensureAutheticated } from "@shared/infra/http/middlewares/ensureAutheticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";


const categoriesRoutes=Router();
const upload=multer({
    dest:"./tmp",
});

const createCategoryController=new CreateCategoryController();
const importCategoryController= new ImportCategoryController()
const listCategoryController = new ListCategoryController()


categoriesRoutes.post("/",
    ensureAutheticated,
    ensureAdmin,
    createCategoryController.handle
);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post("/import",upload.single("file"), 
    ensureAutheticated,
    ensureAdmin,
    importCategoryController.handle
);

export {categoriesRoutes};
