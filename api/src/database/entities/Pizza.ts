import { Entity,  Column, ManyToMany, JoinTable, BeforeInsert, AfterLoad, BeforeUpdate } from "typeorm";
import { Common } from "./Common";
import { Topping } from "./Topping";

@Entity()
export class Pizza extends Common {

  @ManyToMany(() => Topping, (topping) => topping.pizzas, {
    eager: true
  })
  @JoinTable()
  toppings: Topping[]

  @Column({
    unique: true,
    type: "varchar"
  })
  toppingComposit: string


}