import { AppDataSource } from "../database/AppDataSource";
import { Topping } from "../database/entities/Topping";

export const ToppingRepository = AppDataSource.getRepository(Topping).extend({
  // Here is where additional repository logic would go
})