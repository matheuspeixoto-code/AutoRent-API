import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"
import { AppError } from "@shared/errors/AppError"

let createCarUseCase:CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create car",()=>{
    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("should be able to create a new car",async ()=>{
        const car=await createCarUseCase.execute({
            name:"name car",
            description:"Description test",
            daily_rate:100,
            license_plate:"ABC-1234",
            fine_amount:50,
            brand:"Brand",
            category_id:"category",
        })

        expect(car).toHaveProperty("id")
    })

    it("shoul not be able to create a car with exists license plate",()=>{
        expect(async ()=>{

            await createCarUseCase.execute({
                name:"Car1",
                description:"Description test",
                daily_rate:100,
                license_plate:"ABC-1233",
                fine_amount:50,
                brand:"Brand",
                category_id:"category",
            });
            await createCarUseCase.execute({
                name:"Car2",
                description:"Description test",
                daily_rate:100,
                license_plate:"ABC-1233",
                fine_amount:50,
                brand:"Brand",
                category_id:"category",
            });

        }).rejects.toBeInstanceOf(AppError)
    })

    it("shoul not be able to create a car with available true by default",async()=>{
        const car = await createCarUseCase.execute({
            name:"Car1",
            description:"Description test",
            daily_rate:100,
            license_plate:"ABC-1233",
            fine_amount:50,
            brand:"Brand",
            category_id:"category",
        });


        expect(car.available).toBe(true)
    })
    
})