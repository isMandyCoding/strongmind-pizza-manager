import { Not } from "typeorm";
import { Pizza } from "../database/entities/Pizza";
import { Topping } from "../database/entities/Topping";
import { BadUserInputError, EntityNotFoundError } from "../errors/ClientSafeError";
import { PizzaRepository } from "../repositories/PizzaRepository";
import { DeleteResultView } from "../views/DeleteResultView";
import { PizzaView } from "../views/PizzaView";
import { ToppingView } from "../views/ToppingView";

export class PizzaService {

  static async rejectIfDuplicate(pizza: PizzaView) {
    const duplicatePizza = await PizzaRepository.findOne({
      where: [
        {
          id: Not(Number(pizza.id)),
          name: pizza.name,
        },
        {
          id: Not(Number(pizza.id)),
          toppingComposit: pizza.toppingComposit,
        }
      ]
    })
    if (duplicatePizza) {
      throw new BadUserInputError({
        detail: "Duplicate Pizza name or toppings is not allowed",
      });
    }
  }

  static async findOrReject(pizza: PizzaView): Promise<Pizza> {
    const foundPizza = await PizzaRepository.findOne({
      where: {
        id: pizza.id
      }
    });
    if (!foundPizza) {
      throw new EntityNotFoundError("Pizza");
    }
    return foundPizza;
  }


  static async createNewPizza(pizza: PizzaView): Promise<PizzaView> {
    await PizzaService.rejectIfDuplicate(pizza);
    const newPizza = new Pizza();
    newPizza.name = pizza.name;
    newPizza.toppings = pizza.toppings.map((topping: ToppingView) => {
      const toppingToAdd = new Topping();
      if (!topping.id) {
        throw new BadUserInputError({
          detail: "Toppings must have an id."
        });
      }
      toppingToAdd.id = topping.id;
      toppingToAdd.name = topping.name;
      return toppingToAdd;
    });
    const result = await PizzaRepository.save(newPizza);
    return new PizzaView({
      id: result.id,
      name: result.name,
      toppings: result.toppings,
    });
  }

  static async getAllPizzas(): Promise<PizzaView[]> {
    const pizzas = await PizzaRepository.find({
      relations: {
        toppings: true,
      }
    });
    return pizzas.map(pizza => new PizzaView(pizza));
  }

  static async updateExistingPizza(pizza: PizzaView): Promise<PizzaView> {
    console.error("Not implemented");
    throw Error("Not Implemented");
    return pizza
  }

  static async deleteExistingPizza(pizza: PizzaView): Promise<DeleteResultView> {
    const pizzaToDelete = await PizzaService.findOrReject(pizza);
    await PizzaRepository.delete(pizzaToDelete.id);
    return new DeleteResultView(pizza.id ?? 0, "success");
  }
}