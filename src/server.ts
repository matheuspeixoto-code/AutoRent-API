import "reflect-metadata";
import express, { NextFunction, Request, request, Response, response } from "express";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json"

import { AppDataSource } from "./data-source";

import "@shared/container";
import { AppError } from "@errors/AppError";

const app =express();
app.use(express.json());

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerFile))

app.use(router)

app.use((err:Error,request:Request,response:Response,next:NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({message:err.message})
    }

    return response.status(500).json({
        status:"error",
        message:`nternal server error - ${err.message}`

    })
})

AppDataSource.initialize().then(()=>{
    console.log("APP data inicializado")
    
    app.listen(3333, ()=> {
        console.log("Server esta rodando")
        console.log(`Documentation Swagger: http://localhost:3333/api-docs`);
    });
})