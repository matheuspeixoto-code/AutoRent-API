import { IUsersRepository } from "@modules/accounts/repository/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repository/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import {v4 as uuidV4} from "uuid"
import {resolve} from "path"


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

        const templatePath = resolve(__dirname,
            "..",
            "..",
            "views", 
            "emails", 
            "forgotPassword.hbs")

        if(!user){
            throw new AppError("User does not exists!")
        }

        const token = uuidV4()
        const expires_date = this.dateProvider.addHours(3)

        const variables = {
            name:user.name,
            link:`${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.userTokenRepository.create({
            refresh_token:token,
            user_id:user.id,
            expires_date
        })

        await this.mailProvider.sendMail(
            email,
            "Recuperacao de senha",
            variables,
            templatePath
        )

    }
}


export {SendForgotPasswordMailUseCase}