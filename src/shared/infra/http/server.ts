import { AppDataSource } from "@data";
import "dotenv/config"
import { app } from "./app";

AppDataSource.initialize().then(()=>{
    console.log("APP data inicializado")
    
    app.listen(3333, ()=> {
        console.log("Server esta rodando")
        console.log(`Documentation Swagger: http://localhost:3333/api-docs`);
    });
})