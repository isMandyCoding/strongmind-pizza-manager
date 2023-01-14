import { NextFunction, Request, Response } from "express";
import { DeleteResult } from "typeorm";
import { PizzaService } from "../services/PizzaService";
import { DeleteResultView } from "../views/DeleteResultView";
import { PizzaView } from "../views/PizzaView";

export class PizzaController {

  static async getPizzas(req: Request, resp: Response, next: NextFunction): Promise<undefined | Response<PizzaView[]>> {
    try {
      const pizzas = await PizzaService.getAllPizzas();
      return resp.send(pizzas);
    } catch (error) {
      next(error);
    }
  }

  static async createPizza(req: Request, resp: Response, next: NextFunction): Promise<undefined | Response<PizzaView>> {
    try {
      console.error("Not implemented");
      return resp.send(new PizzaView({id: 1, name: "blah", toppings: []}));
    } catch (error) {
      next(error);
    }
  }

  static async updatePizza(req: Request, resp: Response): Promise<Response<PizzaView>> {
    console.error("Not implemented");
    return resp.send(new PizzaView({id: 1, name: "blah", toppings: []}));
  }

  static async deletePizza(req: Request, resp: Response): Promise<Response<DeleteResultView>> {
    console.error("Not implemented");
    return resp.send(new DeleteResultView(1, "success"));
  }
  
}