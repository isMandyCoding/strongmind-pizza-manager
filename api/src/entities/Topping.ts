import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Common } from "./Common";

@Entity()
export class Topping extends Common {
}