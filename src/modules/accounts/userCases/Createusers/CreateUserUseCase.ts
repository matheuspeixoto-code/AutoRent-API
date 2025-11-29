import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repository/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreaetUserDTO";

import {hash} from "bcrypt"

@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    async execute({name,email,driver_license,password}:ICreateUserDTO):Promise<void> {
        const userAlreadyExists= await this.userRepository.findByEmail({email})

        if(!userAlreadyExists){
            throw new Error("User alread exists")
        }
        const passwordHash= await hash(password,8)
        await this.userRepository.create({
            name,
            email,
            driver_license,
            password: passwordHash
        })
    }
}

export {CreateUserUseCase}