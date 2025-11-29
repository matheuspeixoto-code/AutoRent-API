import { ICreateUserDTO } from "../dtos/ICreaetUserDTO"


interface IUsersRepository{
    create(data:ICreateUserDTO): Promise<void>
}

export {IUsersRepository}