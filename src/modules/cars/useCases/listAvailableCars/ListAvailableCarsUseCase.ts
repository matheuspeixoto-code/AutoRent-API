import { ICarsRepository } from "@modules/cars/repository/implementations/ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest{
    category_id?:string;
    brand?:string;
    name?:string;
}

class ListAvailableCarsUseCase{
    constructor (
       private carsRepository:ICarsRepository

    ){}
    async execute({category_id,brand,name}:IRequest):Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            brand,
            category_id,
            name
        )

        return cars
    }
}

export {ListAvailableCarsUseCase}