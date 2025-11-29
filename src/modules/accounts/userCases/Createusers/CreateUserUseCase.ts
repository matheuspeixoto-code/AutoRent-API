import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repository/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreaetUserDTO";

@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    async execute({name,email,driver_license,password}:ICreateUserDTO):Promise<void> {
        await this.userRepository.create({
            name,
            email,
            driver_license,
            password
        })
    }
}

export {CreateUserUseCase}