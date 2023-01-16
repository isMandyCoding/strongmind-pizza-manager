import { Not } from "typeorm";
import { Topping } from "../database/entities/Topping";
import { BadUserInputError, EntityNotFoundError } from "../errors/ClientSafeError";
import { ToppingRepository } from "../repositories/ToppingRepository";
import { DeleteResultView } from "../views/DeleteResultView";
import { ToppingView } from "../views/ToppingView";

export class ToppingService {

  static async rejectIfDuplicate(topping: ToppingView) {
    const testTopping = await ToppingRepository.findOne({
      where: {
        name: topping.name,
        id: Not(Number(topping.id))
      },
    })
    if (testTopping) {
      throw new BadUserInputError({
        detail: "Duplicate Topping name is not allowed"
      });
    }
  }

  static async rejectDeleteIfHasPizzasOrNotFound(topping: ToppingView) {
      const testTopping = await ToppingService.findOneOrReject(topping);
      if (testTopping?.pizzas.length > 0) {
        const pizzaList = testTopping.pizzas.map((pizza) => pizza.name).join(", ");
        throw new BadUserInputError({
          detail: `Unable to delete. Topping is being used on pizzas named: ${pizzaList}`
        });
      }
      return testTopping;
  };

  static async findOneOrReject(topping: ToppingView): Promise<Topping> {
    const foundTopping = await ToppingRepository.findOne({
      relations: {
        pizzas: true,
      },
      where: {
        id: topping.id
      }
    });
    if (!foundTopping) {
      throw new EntityNotFoundError("Topping");
    }
    return foundTopping;
  }

  static async createNewTopping(topping: ToppingView): Promise<ToppingView> {
    await this.rejectIfDuplicate(topping);
    const newTopping = new Topping();
    newTopping.name = topping.name;
    const result = await ToppingRepository.save(newTopping);
    return new ToppingView({
      id: result.id,
      name: result.name
    });
  }

  static async getAllToppings(): Promise<ToppingView[]> {
    const toppings: Topping[] = await ToppingRepository.find();
    return toppings.map((topping) => new ToppingView(topping));
  }

  static async updateExistingTopping(topping: ToppingView): Promise<ToppingView> {
    await this.rejectIfDuplicate(topping);
    const toppingToUpdate = await this.findOneOrReject(topping);
    toppingToUpdate.name = topping.name;
    const result = await ToppingRepository.save(toppingToUpdate);
    return new ToppingView(result);
  }

  static async deleteExistingTopping(topping: ToppingView): Promise<DeleteResultView> {
    const toppingToDelete = await this.rejectDeleteIfHasPizzasOrNotFound(topping);
    await ToppingRepository.delete(toppingToDelete.id);
    return new DeleteResultView(toppingToDelete.id, "success");
  }

}