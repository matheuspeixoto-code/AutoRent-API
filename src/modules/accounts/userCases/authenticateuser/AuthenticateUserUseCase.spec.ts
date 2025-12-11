
import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreaetUserDTO" 
import { UserRepositoryInMemory } from "@modules/accounts/repository/In-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "../Createusers/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase:AuthenticateUserUseCase
let usersRepositoryInMemory:UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe ("Autheticate User",()=>{
    beforeEach(()=>{
        usersRepositoryInMemory= new UserRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("should be able to authenticate an user",async ()=>{
        const user:ICreateUserDTO={
            driver_license:"001432",
            email:"user@teste.com",
            password:"1234",
            name:"User test"
        }
        await createUserUseCase.execute(user)

        const result=await authenticateUserUseCase.execute({
            email:user.email,
            password:user.password
        })

        expect(result).toHaveProperty("token")
    })

    it("should not be able to authenticate an nonexistent user",()=>{
        expect(async ()=>{
            await authenticateUserUseCase.execute({
                email:"false@email.com",
                password:"1234"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to authenticate with incorrect passowrd",()=>{
        expect(async()=>{
            const user : ICreateUserDTO={
                driver_license:"9999",
                email:"user@gmail.com",
                password:"1234",
                name:"userTeste Error"
            }
            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: user.email,
                password:"incorret password"
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})