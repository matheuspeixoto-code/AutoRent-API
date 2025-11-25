import { response } from "express";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repository/implementations/ICategoriesRepository";


class ListCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository){}
    execute(): Category[] {
        const categories=this.categoriesRepository.list();

        return categories;
    }
}

export {ListCategoryUseCase};