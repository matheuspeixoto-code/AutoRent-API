import auth from "@config/auth"
import { IUsersTokenRepository } from "@modules/accounts/repository/IUsersTokenRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import {verify,sign} from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface IPayload{
    sub:string,
    email:string
}


@injectable()
class RefreshTokenUseCase{
    constructor(
        @inject("UserTokenRepository")
        private userTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvader:IDateProvider
    ){}
    async execute(token:string):Promise<string>{

        const {email,sub}=verify(token,auth.secret_refresh_token) as IPayload
        const user_id = sub

        const userToken=await this.userTokenRepository.findByUserIdAndRefreshToken(user_id,token)

        if(!userToken){
            throw new AppError("Refresh Token does not exists!")
        }

        await this.userTokenRepository.deleteById(userToken.id);

        const expires_date = this.dayjsDateProvader.addDate(auth.expires_refresh_token_date)

        const refresh_token= sign({email},auth.secret_refresh_token,
            {
                subject:sub,
                expiresIn:auth.expires_refresh_token
            }
        )

        await this.userTokenRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        return refresh_token
        
    }

}

export{RefreshTokenUseCase}