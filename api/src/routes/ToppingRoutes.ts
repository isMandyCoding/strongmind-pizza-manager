import { Application } from "express"
import { ToppingController } from "../controllers/ToppingController"

export const ToppingRoutes = (app: Application) => {
  app.get("/toppings", ToppingController.getToppings)
}