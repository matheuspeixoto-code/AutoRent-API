import {container} from "tsyringe"

import "@shared/container/providers"

import { ICategoriesRepository } from "@modules/cars/repository/implementations/ICategoriesRepository"
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository" 
import { ISpecificationRepository } from "@modules/cars/repository/implementations/ISpecificationRepository"
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { IUsersRepository } from "@modules/accounts/repository/IUsersRepository"
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository" 
import { ICarsRepository } from "@modules/cars/repository/implementations/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImagesRepository } from "@modules/cars/repository/implementations/ICarsImagesRepository"
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository"
import { IRentalsRepository } from "@modules/rentals/repository/IRentalsRepository"
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repository/RentalsRepository"

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

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)