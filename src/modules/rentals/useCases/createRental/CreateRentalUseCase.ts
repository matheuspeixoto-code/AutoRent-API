import { AppError } from "@shared/errors/AppError";
import {IRentalsRepository} from "@modules/rentals/repository/IRentalsRepository"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";


interface IRequest{
    user_id:string;
    car_id:string;
    expected_return_date:Date;
}

class CreateRentalUseCase{
    constructor(
        private rentalsRepository:IRentalsRepository
    ){}
    async execute({user_id,car_id,expected_return_date}:IRequest):Promise<Rental>{

        const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

        if(carUnAvailable){
            throw new AppError("Car is unavailable")
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for user!")
        }

        const rental=await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        return rental
    }
}

export{CreateRentalUseCase}