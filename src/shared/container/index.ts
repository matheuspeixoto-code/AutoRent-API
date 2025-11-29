import {container} from "tsyringe"
import { ICategoriesRepository } from "../../modules/cars/repository/implementations/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repository/CategoriesRepository"
import { ISpecificationRepository } from "../../modules/cars/repository/implementations/ISpecificationRepository"
import { SpecificationRepository } from "../../modules/cars/repository/SpecificationRepository"
import { IUsersRepository } from "../../modules/accounts/repository/IUsersRepository"
import { UserRepository } from "../../modules/accounts/repository/implementation/UserRepository"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
)