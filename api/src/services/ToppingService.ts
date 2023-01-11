import { Topping } from "../database/entities/Topping";
import { ToppingRepository } from "../repositories/ToppingRepository";
import { DeleteResultView } from "../views/DeleteResultView";
import { ToppingView } from "../views/ToppingView";

export class ToppingService {

  static createNewTopping = async (topping: ToppingView): Promise<ToppingView> => {
    console.error("Not implemented");
    throw Error("Not Implemented");
    return topping;
  }

  static getAllToppings = async (): Promise<ToppingView[]> => {
    const toppings = await ToppingRepository.find();
    throw Error("Not Implemented");
    return toppings;
  }

  static updateExistingTopping = async (topping: ToppingView): Promise<ToppingView> => {
    console.error("Not implemented");
    throw Error("Not Implemented");
    return topping;
  }

  static deleteExistingTopping = async (topping: ToppingView): Promise<DeleteResultView> => {
    console.error("Not implemented");
    throw Error("Not Implemented");
    return new DeleteResultView(topping.id ?? 0, "success");
  }

}