import { AppDataSource } from "../database/AppDataSource";
import { Pizza } from "../database/entities/Pizza";

export const PizzaRepository = AppDataSource.getRepository(Pizza).extend({
  // Here is where additional repository logic would go
})