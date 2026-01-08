import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repository/IUsersTokenRepository";
import { UserToken } from "../entities/UserTokens";
import { Repository } from "typeorm";
import { AppDataSource } from "@data";


class UserTokenRepository implements IUsersTokenRepository{
    private repository:Repository<UserToken>

    constructor(){
        this.repository=AppDataSource.getRepository(UserToken)
    }
    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }
    async findByUserIdAndRefreshToken(user_id: string,refresh_token:string): Promise<UserToken> {
        const usersToken = await this.repository.findOne({where:{user_id, refresh_token}})

        return usersToken
    }
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        await this.repository.save(userToken)

        return userToken
    }

}

export{UserTokenRepository}