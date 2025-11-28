import { Request,Response } from "express"
import { ListCategoryUseCase } from "./ListCategoryUseCase";
import { container } from "tsyringe";

class ListCategoryController{
    
    async handle(request:Request,response:Response): Promise<Response>{
        const listCategoryUseCase= container.resolve(ListCategoryUseCase)
        const allList=await listCategoryUseCase.execute();
        
        return response.status(201).json(allList);
    }
}

export {ListCategoryController}