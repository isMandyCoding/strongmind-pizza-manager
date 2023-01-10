import { Entity,  Column, ManyToMany, JoinTable, BeforeInsert } from "typeorm";
import { Common } from "./Common";
import { Topping } from "./Topping";

@Entity()
export class Pizza extends Common {

  @ManyToMany(() => Topping)
  @JoinTable()
  toppings: Topping[]

  @Column({
    unique: true,
    type: "varchar"
  })
  toppingComposit: string
  
  // Creating a unique composit of topping names before insert to prevent duplicate pizzas
  @BeforeInsert()
  combineToppingNames() {
    this.toppingComposit = this.toppings.map((topping) => topping.name).join(",");
  }
}