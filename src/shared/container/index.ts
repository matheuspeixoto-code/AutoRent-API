import {container} from "tsyringe"
import { ICategoriesRepository } from "../../modules/cars/repository/implementations/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repository/CategoriesRepository"
import { ISpecificationRepository } from "../../modules/cars/repository/implementations/ISpecificationRepository"
import { SpecificationRepository } from "../../modules/cars/repository/SpecificationRepository"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
)