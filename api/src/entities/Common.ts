import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Common {
  
  @PrimaryGeneratedColumn()
  id: number;

  // @IsDef
  @Column({
    unique: true,
    type: "varchar"
  })
  name: string;
}