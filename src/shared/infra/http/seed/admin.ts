import { AppDataSource } from "@data";
import {v4 as uuidV4} from "uuid";
import { hash } from "bcrypt";


async function create(){
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize()
    }
    const id =uuidV4()
    const password = await hash("admin",8)

    await AppDataSource.query(
        `INSERT INTO users(id,name,email,password,"isAdmin",driver_license,created_at)
        values('${id}','admin','admin@gmail.com','${password}',true,'XXXX',now())
        `
    )

    AppDataSource.destroy()
}

create().then(()=> console.log("user admin created!"))