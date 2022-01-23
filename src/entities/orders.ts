import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from "./clients";
import { ProductInOrder } from "../dto/ProductInOrder";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ default: true })
  isPaid: boolean;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @Column()
  products: ProductInOrder[];
}
