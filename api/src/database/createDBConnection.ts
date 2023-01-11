import { DataSource } from "typeorm";
import { AppDataSource } from "./AppDataSource";

const createDBConnection: () => Promise<DataSource> = async () => {
  return AppDataSource.initialize();
}

export default createDBConnection;