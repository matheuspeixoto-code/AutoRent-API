import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory"
import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase"
import { AppError } from "@shared/errors/AppError"
import { SpecificationsRepositoryInMemory } from "@modules/cars/repository/in-memory/SpecificationsRepositoryInMemory"


let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase
let carsRepositoryInMemory:CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create Cars Specifications",()=>{
    beforeEach(()=>{
        carsRepositoryInMemory =  new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(carsRepositoryInMemory,specificationsRepositoryInMemory)
    })
    it("should not be able add a new specifications to a now-existent car",async ()=>{
        expect(async()=>{
            const car_id="1234"
            const specification_id = ["3456"]
            await createCarSpecificationsUseCase.execute({car_id,specification_id})
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able add a new specifications to the car",async ()=>{
        const car = await carsRepositoryInMemory.create({
            name:"name car",
            description:"Description test",
            daily_rate:100,
            license_plate:"ABC-1234",
            fine_amount:50,
            brand:"Brand",
            category_id:"category",
        })
        const specification = await specificationsRepositoryInMemory.create({
            name:"Teste",
            description:"Description test",
            
        })
        const specification_id = [specification.id]

        const specificationCar =await createCarSpecificationsUseCase.execute({
            car_id:car.id,
            specification_id
        })

        expect(specificationCar).toHaveProperty("specifications")
        expect(specificationCar.specifications.length).toBe(1)
    })
})