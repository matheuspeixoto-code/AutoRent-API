import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { 

    ISpecificationRepository ,
    ICreateSpecificationDTO

} from "@modules/cars/repository/implementations/ISpecificationRepository";
import { AppDataSource } from "@data";


class SpecificationRepository implements ISpecificationRepository{
    private repository: Repository<Specification>

    constructor(){
        this.repository=AppDataSource.getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification=this.repository.create({
            description,
            name
        });

        await this.repository.save(specification)
    }

    async findByName(name: string): Promise<Specification> {
        const specification=this.repository.findOne({
            where:{name}
        })

        return specification;
    }
}

export {SpecificationRepository};