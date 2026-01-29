import { AppError } from "@shared/errors/AppError";
import {IRentalsRepository} from "@modules/rentals/repository/IRentalsRepository"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repository/implementations/ICarsRepository";


interface IRequest{
    user_id:string;
    car_id:string;
    expected_return_date:Date;
}

@injectable()
class CreateRentalUseCase{
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository:IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider:IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository


    ){}
    async execute({user_id,car_id,expected_return_date}:IRequest):Promise<Rental>{
        const minimuHour= 24

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
        
        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for user!")
        }
        
        const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        if(carUnAvailable){
            throw new AppError("Car is unavailable")
        }


        const dateNow=this.dateProvider.dateNow()
        const compare = this.dateProvider.compareInHours(dateNow,expected_return_date)

        if(compare<minimuHour){
            throw new AppError("Invalid return time!")
        }

        const rental=await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        })

        await this.carsRepository.updateAvailable(car_id,false)

        return rental
    }
}

export{CreateRentalUseCase}