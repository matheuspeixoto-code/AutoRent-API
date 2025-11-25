import { Category } from "../entities/Category";
import { ICategoriesRepository,ICreateCategoryDTO } from "./implementations/ICategoriesRepository";

import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";

class CategoriesRepository implements ICategoriesRepository{
    private repository:Repository<Category>;

    private static ISNTANCE: CategoriesRepository;

    constructor(){
        this.repository=AppDataSource.getRepository(Category);
    }

    

    async create({description,name}:ICreateCategoryDTO):Promise<void>{
        const category=this.repository.create({
            description,
            name
        });

        await this.repository.save(category);
        
    }

    async list(): Promise<Category[]>{
        const categories=this.repository.find();
        return categories
    }

    async findByName(name:string):Promise<Category>{
        const category= await this.repository.findOne({ where:{name} })
        return category;
    }
}

export {CategoriesRepository}