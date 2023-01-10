import { AppDataSource } from "../database/data-source";
import { Pizza } from "../entities/Pizza";

export const PizzaRepository = AppDataSource.getRepository(Pizza).extend({
  // Here is where additional repository logic would go
})