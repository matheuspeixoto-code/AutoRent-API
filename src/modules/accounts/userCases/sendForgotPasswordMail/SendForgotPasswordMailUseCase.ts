import { IUsersRepository } from "@modules/accounts/repository/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repository/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import {v4 as uuidV4} from "uuid"


@injectable()
class SendForgotPasswordMailUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository,
        @inject("UserTokenRepository")
        private userTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealIMailProvider")
        private mailProvider: IMailProvider
    ){}
    async execute(email:string):Promise<void>{
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new AppError("User does not exists!")
        }

        const token = uuidV4()
        const expires_date = this.dateProvider.addHours(3)

        await this.userTokenRepository.create({
            refresh_token:token,
            user_id:user.id,
            expires_date
        })

        await this.mailProvider.sendMail(email,"Recuperacao de senha",`o link para o reset e ${token}`)

    }
}


export {SendForgotPasswordMailUseCase}