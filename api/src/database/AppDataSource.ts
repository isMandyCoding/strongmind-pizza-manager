import { DataSource } from "typeorm"
import Entities from "./entities";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'db', // Docker network host (service name)
    port: 5432, // Docker container port
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    entities: Entities,
    migrations: [],
    subscribers: [],
    synchronize: true,

});