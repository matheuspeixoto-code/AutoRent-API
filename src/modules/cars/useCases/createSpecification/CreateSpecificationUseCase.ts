import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repository/implementations/ISpecificationRepository";

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
    execute({name,description}:IRequest):void{
        const specificationAlreadyExists= this.specificationRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new Error("especificação já existe")
        }
        this.specificationRepository.create({
            name,
            description,
        })
        
    }
}

export {CreateSpecificationUseCase}