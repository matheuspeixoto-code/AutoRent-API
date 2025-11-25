import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "autorent",

  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],

  synchronize: false,
  logging: false,
});
