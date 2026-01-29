import { DataSource } from "typeorm";
import "dotenv/config"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.NODE_ENV === "test" ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB,

  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/shared/infra/database/migrations/*.ts"],

  synchronize: false,
  logging: false,
});
