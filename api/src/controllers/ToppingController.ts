import { validate, validateOrReject } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { BadUserInputError } from "../errors/ClientSafeError";
import { errorCatcher } from "../errors/errorCatcher";
import { ToppingService } from "../services/ToppingService";
import { ToppingValidator } from "../validators/ToppingValidator";
import { ToppingView } from "../views/ToppingView";


export class ToppingController {

  static async validateTopping(req: Request, next: NextFunction) {
    try {
      const toppingValidator = new ToppingValidator();
      toppingValidator.name = req.body.name;
      return await validateOrReject(toppingValidator);
    } catch (error) {
      return next(new BadUserInputError({
        errors: error
      }));
    }
  }
  
  static async getToppings(req: Request, resp: Response, next: NextFunction): Promise<void | Response<ToppingView[]>> {
    return await errorCatcher(next, async () => {
      const toppings = await ToppingService.getAllToppings();
      return resp.send(toppings);
    });
  }

  static async createTopping(req: Request, resp: Response, next: NextFunction): Promise<void | Response<ToppingView>> {
    await this.validateTopping(req, next);
    return await errorCatcher(next, async () => {
      const newTopping = new ToppingView({
        name: req.body.name,
      })
      const result = await ToppingService.createNewTopping(newTopping);
      return resp.send(result);
    });
  }
  
  static async updateTopping(req: Request, resp: Response, next: NextFunction): Promise<void | Response<ToppingView>> {
    await this.validateTopping(req, next);
    return await errorCatcher(next, async () => {
      const toppingToUpdate = new ToppingView({
        id: req.body.id,
        name: req.body.name
      });
      const result = await ToppingService.updateExistingTopping(toppingToUpdate);
      return resp.send(result);
    });
  }

  static async deleteTopping(req: Request, resp: Response, next: NextFunction): Promise<Response<ToppingView>> {
    await this.validateTopping(req, next);
    return errorCatcher(next, async () => {
      const toppingToDelete = new ToppingView({
        id: req.body.id,
        name: req.body.name
      });
      const result = await ToppingService.deleteExistingTopping(toppingToDelete);
      return resp.send(result);
    });
  }

}