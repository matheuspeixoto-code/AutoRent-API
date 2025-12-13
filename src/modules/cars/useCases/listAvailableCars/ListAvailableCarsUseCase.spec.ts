import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase:ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List cars",()=>{
    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })
    
    it("should be able list all available cars",async ()=>{
        const car= await carsRepositoryInMemory.create({
            "name":"BMW A1",
            "description":"Carro com 220 cavalos",
            "daily_rate":200,
            "license_plate":"AQF-3H157",
            "fine_amount":120,
            "brand":"Audi",
            "category_id":"680cc78f-0088-4917-976a-9e9a2a43aedb"
        })
        const cars=await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by brand",async ()=>{
        const car= await carsRepositoryInMemory.create({
            "name":"BMW A1",
            "description":"Carro com 220 cavalos",
            "daily_rate":200,
            "license_plate":"AQF-3H157",
            "fine_amount":120,
            "brand":"car_brand_teste",
            "category_id":"680cc78f-0088-4917-976a-9e9a2a43aedb"
        })
        const cars=await listAvailableCarsUseCase.execute({
            brand:"car_brand_teste",
        })

        expect(cars).toEqual([car])
    })
    it("should be able to list all available cars by name",async ()=>{
        const car= await carsRepositoryInMemory.create({
            "name":"BMW A1",
            "description":"Carro com 220 cavalos",
            "daily_rate":200,
            "license_plate":"AQF-3H157",
            "fine_amount":120,
            "brand":"car_brand_teste",
            "category_id":"680cc78f-0088-4917-976a-9e9a2a43aedb"
        })
        const cars=await listAvailableCarsUseCase.execute({
            name:"BMW A1",
        })

        expect(cars).toEqual([car])
    })
    it("should be able to list all available cars by category_id",async ()=>{
        const car= await carsRepositoryInMemory.create({
            "name":"BMW A1",
            "description":"Carro com 220 cavalos",
            "daily_rate":200,
            "license_plate":"AQF-3H157",
            "fine_amount":120,
            "brand":"car_brand_teste",
            "category_id":"680cc78f-0088-4917-976a-9e9a2a43aedb"
        })
        const cars=await listAvailableCarsUseCase.execute({
            category_id:"680cc78f-0088-4917-976a-9e9a2a43aedb",
        })

        expect(cars).toEqual([car])
    })
})