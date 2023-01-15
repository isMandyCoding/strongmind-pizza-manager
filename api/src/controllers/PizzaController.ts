import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { DeleteResult } from "typeorm";
import { BadUserInputError } from "../errors/ClientSafeError";
import { errorCatcher } from "../errors/errorCatcher";
import { PizzaService } from "../services/PizzaService";
import { PizzaValidator } from "../validators/PizzaValidator";
import { DeleteResultView } from "../views/DeleteResultView";
import { PizzaView } from "../views/PizzaView";

export class PizzaController {

  static async validatePizza(req: Request, next: NextFunction) {
    try {
      const pizzaValidator = new PizzaValidator();
      pizzaValidator.name = req.body.name;
      pizzaValidator.toppings = req.body.toppings;
      return await validateOrReject(pizzaValidator);
    } catch (error) {
      return next (new BadUserInputError({
        detail: error,
      }))
    }
  }

  static async getPizzas(req: Request, resp: Response, next: NextFunction): Promise<undefined | Response<PizzaView[]>> {
    try {
      const pizzas = await PizzaService.getAllPizzas();
      return resp.send(pizzas);
    } catch (error) {
      next(error);
    }
  }

  static async createPizza(req: Request, resp: Response, next: NextFunction): Promise<undefined | Response<PizzaView>> {
    await PizzaController.validatePizza(req, next);
    return await errorCatcher(next, async () => {
      const newPizza = new PizzaView({
        name: req.body.name,
        toppings: req.body.toppings
      });
      const result = await PizzaService.createNewPizza(newPizza);
      return resp.send(result);
    })
  }

  static async updatePizza(req: Request, resp: Response): Promise<Response<PizzaView>> {
    console.error("Not implemented");
    return resp.send(new PizzaView({id: 1, name: "blah", toppings: []}));
  }

  static async deletePizza(req: Request, resp: Response, next: NextFunction): Promise<Response<DeleteResultView>> {
    await PizzaController.validatePizza(req, next);
    return errorCatcher(next, async () => {
      const pizzaToDelete = new PizzaView(req.body);
      const result = await PizzaService.deleteExistingPizza(pizzaToDelete);
      return resp.send(result);
    })
  }
  
}