import { Pizza } from "../database/entities/Pizza";
import { Topping } from "../database/entities/Topping";
import { CommonView, CommonViewParams } from "./CommonView";
import { ToppingView, ToppingViewParams } from "./ToppingView";

export interface PizzaViewParams extends CommonViewParams {
  toppings: ToppingView[];
}

export class PizzaView extends CommonView {
  toppings: ToppingView[];

  constructor(pizza: PizzaViewParams) {
    super(pizza);
    this.toppings = pizza.toppings.map((topping: ToppingViewParams) => new ToppingView(topping));
  }
}