import {inject,injectable} from "tsyringe"
import { ICategoriesRepository,ICreateCategoryDTO } from "../../repository/implementations/ICategoriesRepository";

interface IRequest{
    name:string;
    description:string;
}

@injectable()
class CreateCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ){}
    async execute({name,description}:IRequest): Promise<void> {
        
        const categoryAlreadExists= await this.categoriesRepository.findByName(name);
        if(categoryAlreadExists){
            throw new Error("Categoria já existente");
        }
        
        this.categoriesRepository.create({description,name});
    }
}


export {CreateCategoryUseCase}