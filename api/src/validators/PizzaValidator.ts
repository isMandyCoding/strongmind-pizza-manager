import { IsArray } from "class-validator";
import { CommonValidator } from "./CommonValidator";
import { ToppingValidator } from "./ToppingValidator";

export class PizzaValidator extends CommonValidator {
  @IsArray()
  toppings: ToppingValidator[];
}