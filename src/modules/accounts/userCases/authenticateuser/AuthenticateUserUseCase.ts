import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repository/IUsersRepository";
import {compare} from "bcrypt"
import {sign,SignOptions} from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError";
import { IUsersTokenRepository } from "@modules/accounts/repository/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest{
    email:string;
    password:string;
}

interface IResponse{
    user:{
        name:string,
        email:string
    },
    token: string,
    refresh_token:string
}

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository:IUsersRepository,
        @inject("UserTokenRepository")
        private userTokenRepository:IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvader:IDateProvider

    ){}
    async execute({email,password}:IRequest): Promise<IResponse>{
  
        const user= await this.userRepository.findByEmail(email)

        if(!user){
            throw new AppError("Email or password incorrect")
        }


        const passwordMatch = await compare(password,user.password)
        if(!passwordMatch){
            throw new AppError("Email or password incorrect")
        }
        const options: SignOptions = {
            subject: String(user.id),
            expiresIn: auth.expires_in_token,
        };


        const token = sign({},auth.secret_token,options)


        const refresh_token= sign({email},auth.secret_refresh_token,
            {
                subject:user.id,
                expiresIn:auth.expires_refresh_token
            }
        )

        const refresh_token_expires_date = this.dayjsDateProvader.addDate(auth.expires_refresh_token_date)

        await this.userTokenRepository.create({
            user_id:user.id,
            expires_date:refresh_token_expires_date,
            refresh_token
        })

        const tokenReturn:IResponse={
            token,
            user:{
                name:user.name,
                email:user.email
            },
            refresh_token
        }

        return tokenReturn

        //Gerar o JsonWebToken
    }
}

export {AuthenticateUserUseCase}