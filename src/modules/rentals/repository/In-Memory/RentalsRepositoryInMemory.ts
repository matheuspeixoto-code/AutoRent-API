import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { v4 as uuidV4 } from "uuid";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            rental => rental.car_id === car_id && rental.end_date === null
        );
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            rental => rental.user_id === user_id && rental.end_date === null
        );
    }

    async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            id: uuidV4(),
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
            end_date: null,
        });

        this.rentals.push(rental);
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.id === id);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter(rental => rental.user_id === user_id);
    }
}

export { RentalsRepositoryInMemory };
