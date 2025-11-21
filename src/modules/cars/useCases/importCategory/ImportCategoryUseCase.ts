import fs from "fs";
import {parse} from "csv-parse";
import { ICategoriesRepository } from "../../repository/implementations/ICategoriesRepository";

interface IImportCategory{
    name:string;
    description:string;
}

class ImportCategoryUseCase{
    constructor (private categoriesRepoitory:ICategoriesRepository){}
    loadCategories(file:Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve,rejects)=>{
            const stream= fs.createReadStream(file.path);

            const categories:IImportCategory[]=[];

            const parseFile=parse();
            stream.pipe(parseFile);

            parseFile.on("data",async (line)=>{
                //["name", "description"]
                const [name,description]=line;
                categories.push({
                    name,
                    description,
                });
            });

            parseFile.on("end",()=>{
                fs.promises.unlink(file.path);
                resolve(categories);
            });
            parseFile.on("error",(err)=>{
                rejects(err);
            })
        });
    }

    async execute(file:Express.Multer.File):Promise<void>{
        const categories=await this.loadCategories(file);

        categories.map(async category =>{
            const {name,description}=category;
            const existCategory=this.categoriesRepoitory.findByName(name);

            if(!existCategory){
                this.categoriesRepoitory.create({
                    name,
                    description,

                });
            }
        });
    }
}

export {ImportCategoryUseCase};