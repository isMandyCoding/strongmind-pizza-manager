import { Topping } from "../database/entities/Topping";
import { BadUserInputError, EntityNotFoundError } from "../errors/ClientSafeError";
import { ToppingRepository } from "../repositories/ToppingRepository";
import { DeleteResultView } from "../views/DeleteResultView";
import { ToppingView } from "../views/ToppingView";

export class ToppingService {

  static async rejectIfDuplicate(topping: ToppingView) {
    const testTopping = await ToppingRepository.findOneBy({
      name: topping.name
    });
    if (testTopping && testTopping.id !== topping.id) {
      throw new BadUserInputError({
        detail: "Duplicate Topping name is not allowed"
      });
    }
  }

  static async findOneOrReject(topping: ToppingView): Promise<Topping> {
    const toppingToFind = await ToppingRepository.findOneBy({
      id: topping.id
    });
    if (!toppingToFind) {
      throw new EntityNotFoundError("Topping");
    }
    return toppingToFind;
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
    await ToppingRepository.save(toppingToUpdate);
    return new ToppingView(toppingToUpdate);
  }

  static async deleteExistingTopping(topping: ToppingView): Promise<DeleteResultView> {
    const toppingToDelete = await this.findOneOrReject(topping);
    await ToppingRepository.delete(toppingToDelete);
    return new DeleteResultView(toppingToDelete.id, "success");
  }

}