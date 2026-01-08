import { NextFunction, Request,Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";
import { UserTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import auth from "@config/auth";

interface IPayload{
    sub:string
}

export async function ensureAutheticated(request:Request,response:Response,next:NextFunction){
    const authHeader = request.headers.authorization;
    const userTokenRepository = new UserTokenRepository()

    if(!authHeader){
        throw new AppError("Token missing",401)
    }

    const [,token]= authHeader.split(" ")

    try{
        const {sub :user_id} =verify(token,auth.secret_refresh_token) as IPayload
        const user=await userTokenRepository.findByUserIdAndRefreshToken(user_id,token)
        
        if(!user){
            throw new AppError("User does not exists", 401)
        }

        request.user={
            id:user_id
        }

        next()

    }catch{
        throw new AppError("Invalid token",401)
    }
}