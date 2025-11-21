
import { ICategoriesRepository,ICreateCategoryDTO } from "../../repository/implementations/ICategoriesRepository";

interface IRequest{
    name:string;
    description:string;
}


class CreateCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository){}
    execute({name,description}:IRequest): void {
        
        const categoryAlreadExists= this.categoriesRepository.findByName(name);
        if(categoryAlreadExists){
            throw new Error("Categoria já existente");
        }
        
        this.categoriesRepository.create({description,name});
    }
}


export {CreateCategoryUseCase}