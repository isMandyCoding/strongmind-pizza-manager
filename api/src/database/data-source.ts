import { DataSource } from "typeorm"
// import { ExampleEntity } from "../entities/ExampleEntity"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'db', // Docker network host (service name)
    port: 5432, // Docker container port
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [/* ExampleEntity */],
    migrations: [],
    subscribers: [],
});