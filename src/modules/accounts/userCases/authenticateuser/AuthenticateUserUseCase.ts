import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repository/IUsersRepository";
import {compare} from "bcrypt"
import {sign} from "jsonwebtoken"

interface IRequest{
    email:string;
    password:string;
}

interface IResponse{
    user:{
        name:string,
        email:string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UserRepository")
        private userRepository:IUsersRepository
    ){}
    async execute({email,password}:IRequest): Promise<IResponse>{
        //Usuario existe
        const user= await this.userRepository.findByEmail(email)

        if(!user){
            throw new Error("Email or password incorrect")
        }


        //senha correta
        const passwordMatch = await compare(password,user.password)
        if(!passwordMatch){
            throw new Error("Email or password incorrect")
        }

        const token = sign({},"27aaf7525c13ff8ed6c5e1eaabf32bdb",{
            subject:user.id,
            expiresIn:"1d"
            
        })

        return {
            user,
            token
        }

        //Gerar o JsonWebToken
    }
}

export {AuthenticateUserUseCase}