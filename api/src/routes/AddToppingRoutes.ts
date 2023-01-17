import { Application } from "express"
import { ToppingController } from "../controllers/ToppingController"

export const AddToppingRoutes = (app: Application) => {
  app.get("/toppings", ToppingController.getToppings);
  app.post("/toppings", ToppingController.createTopping);
  app.delete("/toppings", ToppingController.deleteTopping);
  app.put("/toppings", ToppingController.updateTopping);
}