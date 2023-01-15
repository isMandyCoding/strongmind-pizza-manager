import { Application } from "express";
import { PizzaController } from "../controllers/PizzaController";

export const AddPizzaRoutes = (app: Application) => {
  app.post("/pizzas", PizzaController.createPizza);
  app.get("/pizzas", PizzaController.getPizzas);
  
  app.delete("/pizzas", PizzaController.deletePizza);
}