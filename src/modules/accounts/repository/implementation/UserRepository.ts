import { Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreaetUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
import { AppDataSource } from "../../../../data-source";

class UserRepository implements IUsersRepository{
    private repository: Repository<User>

    constructor (){
        this.repository=AppDataSource.getRepository(User)
    }
    async create({name,username,email,driver_license,password}:ICreateUserDTO): Promise<void>{
        const user = this.repository.create({
            name,
            username,
            password,
            email,
            driver_license,
        });

        await this.repository.save(user)
    }
}

export {UserRepository}