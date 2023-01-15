import { Entity, ManyToMany } from "typeorm";
import { Common } from "./Common";
import { Pizza } from "./Pizza";

@Entity()
export class Topping extends Common {
  @ManyToMany(() => Pizza, (pizza) => pizza.toppings)
  pizzas: Pizza[]
}