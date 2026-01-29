import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repository/In-Memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { AppError } from "@shared/errors/AppError"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory"


let createRentalUseCase:CreateRentalUseCase
let rentalsRepositoryInMemory : RentalsRepositoryInMemory
let carsRepositoryInMemory : CarsRepositoryInMemory
let dayJsDateProvider:DayjsDateProvider

describe("Create Rental",()=>{
    const dayADD24Hours = dayjs().add(1,"day").toDate()
    beforeEach(()=>{
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayJsDateProvider = new DayjsDateProvider()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory,dayJsDateProvider,carsRepositoryInMemory)
    })

    it("should be able to create a new rental", async()=>{
        const car = await carsRepositoryInMemory.create({
            name:"Test",
            description:"Car test",
            daily_rate:100,
            license_plate:"test",
            fine_amount:40,
            category_id:"1234",
            brand:"brand"
        })
        const rental = await createRentalUseCase.execute({
            user_id:"12345",
            car_id:car.id,
            expected_return_date :dayADD24Hours
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand"
        })

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayADD24Hours
        })

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: car.id,
                expected_return_date: dayADD24Hours
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user!")
        )
    })


   it("should not be able to create a new rental if there is another open to the same car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "DEF-456",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand"
        })

        await createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: dayADD24Hours
        })

        await expect(
            createRentalUseCase.execute({
                user_id: "321",
                car_id: car.id,
                expected_return_date: dayADD24Hours
            })
        ).rejects.toEqual(
            new AppError("Car is unavailable")
        )
    })


    it("should not be able to create a new rental with invalid return time", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "GHI-789",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand"
        })

        await expect(
            createRentalUseCase.execute({
                user_id: "321",
                car_id: car.id,
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(
            new AppError("Invalid return time!")
        )
    })

})