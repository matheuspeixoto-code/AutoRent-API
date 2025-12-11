import { NextFunction, Request,Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload{
    sub:string
}

export async function ensureAutheticated(request:Request,response:Response,next:NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing",401)
    }

    const [,token]= authHeader.split(" ")

    try{
        const {sub :user_id} =verify(token,"27aaf7525c13ff8ed6c5e1eaabf32bdb") as IPayload
        const userRepository = new UserRepository()
        const user=userRepository.findById(user_id)
        
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