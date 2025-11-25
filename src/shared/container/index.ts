import {container} from "tsyringe"
import { ICategoriesRepository } from "../../modules/cars/repository/implementations/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repository/CategoriesRepository"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)