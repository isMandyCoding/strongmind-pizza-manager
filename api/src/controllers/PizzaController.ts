import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadUserInputError } from "../errors/ClientSafeError";
import { errorCatcher } from "../errors/errorCatcher";
import { PizzaService } from "../services/PizzaService";
import { PizzaValidator } from "../validators/PizzaValidator";
import { DeleteResultView } from "../views/DeleteResultView";
import { PizzaView } from "../views/PizzaView";

export class PizzaController {

  static async validatePizza(req: Request) {
    try {
      const pizzaValidator = new PizzaValidator();
      pizzaValidator.name = req.body.name;
      pizzaValidator.toppings = req.body.toppings;
      return await validateOrReject(pizzaValidator);
    } catch (error) {
      throw new BadUserInputError({
        detail: error,
      });
    }
  }

  static async getPizzas(req: Request, resp: Response, next: NextFunction): Promise<undefined | Response<PizzaView[]>> {
    return await errorCatcher(next, async () => {
      const pizzas = await PizzaService.getAllPizzas();
      return resp.send(pizzas);
    });
  }

  static async createPizza(req: Request, resp: Response, next: NextFunction): Promise<undefined | Response<PizzaView>> {
    return await errorCatcher(next, async () => {
      await PizzaController.validatePizza(req);
      const newPizza = new PizzaView(req.body);
      const result = await PizzaService.createNewPizza(newPizza);
      return resp.send(result);
    })
  }

  static async updatePizza(req: Request, resp: Response, next: NextFunction): Promise<Response<PizzaView>> {
    return await errorCatcher(next, async () => {
      await PizzaController.validatePizza(req);
      const pizzaToUpdate = new PizzaView(req.body);
      const result = await PizzaService.updateExistingPizza(pizzaToUpdate);
      return resp.send(result);
    })
  }

  static async deletePizza(req: Request, resp: Response, next: NextFunction): Promise<Response<DeleteResultView>> {
    return await errorCatcher(next, async () => {
      await PizzaController.validatePizza(req);
      const pizzaToDelete = new PizzaView(req.body);
      const result = await PizzaService.deleteExistingPizza(pizzaToDelete);
      return resp.send(result);
    })
  }
  
}