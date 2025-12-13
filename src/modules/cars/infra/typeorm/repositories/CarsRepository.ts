import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repository/implementations/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository } from "typeorm";
import { AppDataSource } from "@data";


class CarsRepository implements ICarsRepository{

    private repository: Repository<Car>

    constructor(){
        this.repository=AppDataSource.getRepository(Car)
    }
    
    async create({name,description,daily_rate,license_plate,fine_amount,brand,category_id}: ICreateCarDTO): Promise<Car> {
        
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        await this.repository.save(car)

        return car;
    }


    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({where:{license_plate}})

        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuerry = await this.repository.
        createQueryBuilder("c").where("available = :available", {available:true})

        if(brand){
            carsQuerry.andWhere("c.brand = :brand", {brand})
        }
        if(name){
            carsQuerry.andWhere("c.name = :name", {name})
        }
        if(category_id){
            carsQuerry.andWhere("c.category_id = :category_id", {category_id})
        }

        const cars = await carsQuerry.getMany()

        return cars
    }

}

export {CarsRepository}