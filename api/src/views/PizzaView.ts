import { CommonView, CommonViewParams } from "./CommonView";
import { ToppingView, ToppingViewParams } from "./ToppingView";

export interface PizzaViewParams extends CommonViewParams {
  toppings: ToppingView[];
}

export class PizzaView extends CommonView {
  toppings: ToppingView[];

  constructor(pizza: PizzaViewParams) {
    super(pizza);
    this.toppings = pizza.toppings?.map((topping: ToppingViewParams) => new ToppingView(topping));
  }
  
  get toppingComposit() {
    // console.log(this.toppings?.length);
    return this.toppings?.length > 0 ?
      this.toppings
        .map((topping: ToppingView) => topping.name)
        .sort()
        .join(",") :
      this.name;
  }
  
}