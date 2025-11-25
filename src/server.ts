import "reflect-metadata";
import express, { request, response } from "express";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json"

import { AppDataSource } from "./data-source";

import "./shared/container";

const app =express();
app.use(express.json());

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerFile))

app.use(router)

AppDataSource.initialize().then(()=>{
    console.log("APP data inicializado")
    
    app.listen(3333, ()=> {
        console.log("Server esta rodando")
        console.log(`Documentation Swagger: http://localhost:3333/api-docs`);
    });
})