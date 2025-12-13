import { ICarsRepository } from "@modules/cars/repository/implementations/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repository/implementations/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    car_id:string;
    specifications_id:string[]
}


//@injectable()
class CreateCarSpecificationsUseCase{
    constructor(
        //@inject("CarsRepository")
        private carsRepository: ICarsRepository,
        private specificationsRepository:ISpecificationRepository
    ){}
    async execute({car_id, specifications_id}: IRequest):Promise<void> {
        const carExists = await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exists!")
        }

        const specifications = await this.specificationsRepository.findById(specifications_id)

        carExists.specifications = specifications

        await this.carsRepository.create(carExists)

        console.log(carExists)
        
    }
}

export {CreateCarSpecificationsUseCase}