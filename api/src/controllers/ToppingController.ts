import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadUserInputError } from "../errors/ClientSafeError";
import { errorCatcher } from "../errors/errorCatcher";
import { ToppingService } from "../services/ToppingService";
import { ToppingValidator } from "../validators/ToppingValidator";
import { ToppingView } from "../views/ToppingView";


export class ToppingController {

  static async validateTopping(req: Request) {
    try {
      const toppingValidator = new ToppingValidator();
      toppingValidator.name = req.body.name;
      return await validateOrReject(toppingValidator);
    } catch (error) {
      throw new BadUserInputError({
        detail: error
      });
    }
  }
  
  static async getToppings(req: Request, resp: Response, next: NextFunction): Promise<void | Response<ToppingView[]>> {
    return await errorCatcher(next, async () => {
      const toppings = await ToppingService.getAllToppings();
      return resp.send(toppings);
    });
  }

  static async createTopping(req: Request, resp: Response, next: NextFunction): Promise<void | Response<ToppingView>> {
    return await errorCatcher(next, async () => {
      await ToppingController.validateTopping(req);
      const newTopping = new ToppingView({
        name: req.body.name,
      })
      const result = await ToppingService.createNewTopping(newTopping);
      return resp.send(result);
    });
  }
  
  static async updateTopping(req: Request, resp: Response, next: NextFunction): Promise<void | Response<ToppingView>> {
    return await errorCatcher(next, async () => {
      await ToppingController.validateTopping(req);
      const toppingToUpdate = new ToppingView(req.body);
      const result = await ToppingService.updateExistingTopping(toppingToUpdate);
      return resp.send(result);
    });
  }

  static async deleteTopping(req: Request, resp: Response, next: NextFunction): Promise<Response<ToppingView>> {
    return errorCatcher(next, async () => {
      await ToppingController.validateTopping(req);
      const toppingToDelete = new ToppingView(req.body);
      const result = await ToppingService.deleteExistingTopping(toppingToDelete);
      return resp.send(result);
    });
  }

}