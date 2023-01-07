import { DataSource } from "typeorm"
// import { ExampleEntity } from "../entities/ExampleEntity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: 'pizza_mngr_db', // Docker network host
    port: 5432, // Docker container port
    username: 'postgres', // Postgres image default username
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [/* ExampleEntity */],
    migrations: [],
    subscribers: [],
});
