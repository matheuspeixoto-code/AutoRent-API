import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "@modules/cars/repository/implementations/ISpecificationRepository";
import { AppError } from "@errors/AppError";

interface IRequest{
    name:string;
    description:string;
}

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ){}
    async execute({name,description}:IRequest):Promise<void>{
        const specificationAlreadyExists=await this.specificationRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new AppError("especificação já existe")
        }
        await this.specificationRepository.create({
            name,
            description,
        })
        
    }
}

export {CreateSpecificationUseCase}