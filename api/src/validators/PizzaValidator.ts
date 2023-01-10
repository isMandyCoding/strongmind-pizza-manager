import { CommonValidator } from "./CommonValidator";
import { ToppingValidator } from "./ToppingValidator";

export class PizzaValidator extends CommonValidator {
  toppings: ToppingValidator[];
}