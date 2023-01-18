import { Application } from "express";
import { PizzaController } from "../controllers/PizzaController";

export const AddPizzaRoutes = (app: Application) => {
  app.post("/pizzas", PizzaController.createPizza);
  app.get("/pizzas", PizzaController.getPizzas);
  app.put("/pizzas", PizzaController.updatePizza);
  app.delete("/pizzas", PizzaController.deletePizza);
}