import { Request, Response } from "express";
import { DeleteResult } from "typeorm";
import { PizzaService } from "../services/PizzaService";
import { DeleteResultView } from "../views/DeleteResultView";
import { PizzaView } from "../views/PizzaView";

export class PizzaController {

  static getPizzas = async (req: Request, resp: Response): Promise<Response<PizzaView[]>> => {
    console.error("Not implemented");
    const pizzas = await PizzaService.getAllPizzas();
    return resp.send(pizzas);
  }

  static createPizza = async (req: Request, resp: Response): Promise<Response<PizzaView>> => {
    console.error("Not implemented");
    return resp.send(new PizzaView({id: 1, name: "blah", toppings: []}));
  }

  static updatePizza = async (req: Request, resp: Response): Promise<Response<PizzaView>> => {
    console.error("Not implemented");
    return resp.send(new PizzaView({id: 1, name: "blah", toppings: []}));
  }

  static deletePizza = async (req: Request, resp: Response): Promise<Response<DeleteResultView>> => {
    console.error("Not implemented");
    return resp.send(new DeleteResultView(1, "success"));
  }
  
}