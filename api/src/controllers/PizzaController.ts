import { RequestHandler } from "express";
import { PizzaRepository } from "../repositories/PizzaRepository";

export class PizzaController {

  getPizzas: RequestHandler = () => {
    PizzaRepository.find();
  }

  createPizza: RequestHandler = () => {
    console.error("Not implemented");
  }

  updatePizzaToppings: RequestHandler = () => {
    console.error("Not implemented");
  }

  deletePizza: RequestHandler = () => {
    console.error("Not implemented");
  }
  
}