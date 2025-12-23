import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import {specificationRoutes} from "./specifications.routes"
import {userRoutes} from "./users.routes"
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { rentalRoute } from "./rental.routes";

const router=Router();

router.use("/categories",categoriesRoutes);
router.use("/specification",specificationRoutes);
router.use("/users",userRoutes);
router.use("/cars",carsRoutes);
router.use(authenticateRoutes);
router.use("/rentals", rentalRoute)

export {router}