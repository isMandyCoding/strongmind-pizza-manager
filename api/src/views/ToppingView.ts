import { Topping } from "../database/entities/Topping";
import { CommonView, CommonViewParams } from "./CommonView";

export interface ToppingViewParams extends CommonViewParams {
}

export class ToppingView extends CommonView {
  constructor(topping: ToppingViewParams) {
    super(topping);
  }
}