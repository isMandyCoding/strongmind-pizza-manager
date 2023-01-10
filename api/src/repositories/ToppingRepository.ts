import { AppDataSource } from "../database/data-source";
import { Topping } from "../entities/Topping";

export const ToppingRepository = AppDataSource.getRepository(Topping).extend({
  // Here is where additional repository logic would go
})