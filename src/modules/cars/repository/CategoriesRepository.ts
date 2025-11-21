import { Category } from "../model/category";
import { ICategoriesRepository,ICreateCategoryDTO } from "./implementations/ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository{
    private categories: Category[];

    private static ISNTANCE: CategoriesRepository;

    constructor(){
        this.categories=[];
    }

    public static getInstance():CategoriesRepository{
        if(!CategoriesRepository.ISNTANCE){
            CategoriesRepository.ISNTANCE=new CategoriesRepository();
        }
            
        return CategoriesRepository.ISNTANCE;
        
    }

    create({description,name}:ICreateCategoryDTO):void{
        const category: Category=new Category();
        Object.assign(category,{
            name,
            description,
            created_at:new Date()
        });

        this.categories.push(category);
        
    }

    list(): Category[]{
        return this.categories;
    }

    findByName(name:string):Category{
        const category= this.categories.find(category=>category.name===name);

        return category;
    }
}

export {CategoriesRepository}