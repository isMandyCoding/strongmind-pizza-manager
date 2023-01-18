import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}