import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { 

    ISpecificationRepository ,
    ICreateSpecificationDTO

} from "@modules/cars/repository/implementations/ISpecificationRepository";
import { AppDataSource } from "@data";
import { In } from "typeorm";


class SpecificationRepository implements ISpecificationRepository{
    private repository: Repository<Specification>

    constructor(){
        this.repository=AppDataSource.getRepository(Specification)
    }

    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification=this.repository.create({
            description,
            name
        });

        await this.repository.save(specification)
        
        return specification
    }
    
    async findByName(name: string): Promise<Specification> {
        const specification=await this.repository.findOne({
            where:{name}
        })
        
        return specification;
    }

    async findById(ids: string[]): Promise<Specification[]> {
        const specificationId = await this.repository.findBy({id:In(ids)})

        return specificationId
    }
}

export {SpecificationRepository};