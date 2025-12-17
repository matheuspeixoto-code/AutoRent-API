import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repository/implementations/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repository/implementations/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    car_id:string;
    specification_id:string[]
}


@injectable()
class CreateCarSpecificationsUseCase{
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationRepository")
        private specificationsRepository:ISpecificationRepository
    ){}
    async execute({car_id, specification_id}: IRequest):Promise<Car> {

        const carExists = await this.carsRepository.findById(car_id)
        

        if(!carExists){
            throw new AppError("Car does not exists!")
        }

        const specifications = await this.specificationsRepository.findById(specification_id)
        

        carExists.specifications = specifications
        

        await this.carsRepository.create(carExists)


        return carExists
        
    }
}

export {CreateCarSpecificationsUseCase}