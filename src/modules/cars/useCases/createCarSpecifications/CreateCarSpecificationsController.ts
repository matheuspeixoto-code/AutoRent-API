import { Request,Response } from "express"
import { container } from "tsyringe"
import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationsUseCase"


class CreateCarSpecificationsController{
    async handle(request:Request,response:Response): Promise<Response>{
        const {id}= request.params
        const {specification_id} = request.body
        const createCarSpecificationsUseCase= container.resolve(CreateCarSpecificationsUseCase)
        
        const cars = await createCarSpecificationsUseCase.execute({
            car_id: id,
            specification_id
        })


        return response.json(cars)
    }
    
}

export {CreateCarSpecificationsController}