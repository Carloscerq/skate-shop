import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty, IsInt } from "class-validator";
import { Orders } from "./orders";

@Entity()
export class Products {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  @IsInt()
  amountInStock: number;

  @ManyToOne(() => Orders, (order) => order.product)
  orders: Orders;
}
