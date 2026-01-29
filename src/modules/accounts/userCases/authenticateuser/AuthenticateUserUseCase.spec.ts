
import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreaetUserDTO" 
import { UserRepositoryInMemory } from "@modules/accounts/repository/In-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "../Createusers/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { UserTokenRepositoryInMemory } from "@modules/accounts/repository/In-memory/UserTokenRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

let authenticateUserUseCase:AuthenticateUserUseCase
let usersRepositoryInMemory:UserRepositoryInMemory
let userTokenRepository: UserTokenRepositoryInMemory
let dayJsProvider: IDateProvider
let createUserUseCase: CreateUserUseCase

describe ("Autheticate User",()=>{
    beforeEach(()=>{
        usersRepositoryInMemory= new UserRepositoryInMemory()
        dayJsProvider = new DayjsDateProvider()
        userTokenRepository = new UserTokenRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory,userTokenRepository,dayJsProvider)
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

    it("should not be able to authenticate an nonexistent user",async ()=>{
        await expect(authenticateUserUseCase.execute({
                email:"false@email.com",
                password:"1234"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })

    it("should not be able to authenticate with incorrect passowrd",async ()=>{
        const user : ICreateUserDTO={
            driver_license:"9999",
            email:"user@gmail.com",
            password:"1234",
            name:"userTeste Error"
        }
        await createUserUseCase.execute(user)
        await expect( authenticateUserUseCase.execute({
                email: user.email,
                password:"incorret password"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })
})