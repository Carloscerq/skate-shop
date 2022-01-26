import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { IsNotEmpty, IsInt } from "class-validator";
import { Orders } from "../orders/orders.entity";

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

  @OneToMany(() => Orders, (order) => order.product)
  orders: Orders;
}
