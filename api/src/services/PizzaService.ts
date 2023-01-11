import { PizzaRepository } from "../repositories/PizzaRepository";
import { DeleteResultView } from "../views/DeleteResultView";
import { PizzaView } from "../views/PizzaView";

export class PizzaService {

  static createNewPizza = async (pizza: PizzaView): Promise<PizzaView> => {
    console.error("Not implemented");
    throw Error("Not Implemented");
    return await pizza;
  }

  static getAllPizzas = async (): Promise<PizzaView[]> => {
    const pizzas = await PizzaRepository.find();
    return pizzas.map(pizza => new PizzaView(pizza));
  }

  static updateExistingPizza = async (pizza: PizzaView): Promise<PizzaView> => {
    console.error("Not implemented");
    throw Error("Not Implemented");
    return pizza
  }

  static deleteExistingPizza = async (pizza: PizzaView): Promise<DeleteResultView> => {
    console.error("Not implemented");
    throw Error("Not Implemented");
    return new DeleteResultView(pizza.id ?? 0, "success");
  }
}