import { IUsersRepository } from "@modules/accounts/repository/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repository/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { hash } from "bcrypt";

interface IRequest{
    token:string;
    password:string
}


@injectable()
class ResetPasswordUseCase{
    constructor(
        @inject("UserTokenRepository")
        private userTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UserRepository")
        private  userRepository:IUsersRepository
    ){}
    async execute({token,password}:IRequest){
        const userToken = await this.userTokenRepository.findByRefreshToken(token)

        if(!userToken){
            throw new AppError("Token invalid!")
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date,this.dateProvider.dateNow())){
            throw new AppError("Token expired!")
        }

        const user = await this.userRepository.findById(userToken.user_id)

        user.password = await hash(password,8)

        await this.userRepository.create(user)

        await this.userTokenRepository.deleteById(userToken.id)
    }
}

export {ResetPasswordUseCase}