import { DataSource } from "typeorm";
import { AppDataSource } from "./data-source";

const createDBConnection: () => Promise<DataSource> = async () => {
  return AppDataSource.initialize();
}

export default createDBConnection;