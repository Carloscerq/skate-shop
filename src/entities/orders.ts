import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Clients } from "./clients";
import { Products } from "./products";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ default: true })
  isPaid: boolean;

  @ManyToOne(() => Clients, (client) => client.orders)
  client: Clients;

  @OneToMany(() => Products, (product) => product.orders)
  product: Products;

  @Column()
  amount: number;
}
