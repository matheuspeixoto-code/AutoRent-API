import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repository/IUsersTokenRepository";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { v4 as uuidV4 } from "uuid";

class UserTokenRepositoryInMemory implements IUsersTokenRepository {
  usersTokens: UserToken[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuidV4(),
      expires_date,
      refresh_token,
      user_id,
      created_at: new Date(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.usersTokens.find(
      (token) =>
        token.user_id === user_id &&
        token.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter(
      (token) => token.id !== id
    );
  }
}

export { UserTokenRepositoryInMemory };
