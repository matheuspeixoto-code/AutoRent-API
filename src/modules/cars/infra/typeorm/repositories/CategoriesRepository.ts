import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository,ICreateCategoryDTO } from "@modules/cars/repository/implementations/ICategoriesRepository";

import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "@data";

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