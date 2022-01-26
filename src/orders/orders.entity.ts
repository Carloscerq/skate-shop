import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Clients } from "../clients/clients.entity";
import { Products } from "../products/products.entity";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ default: false })
  isPaid: boolean;

  @ManyToOne(() => Clients, (client) => client.orders)
  client: Clients;

  @ManyToOne(() => Products, (product) => product.orders)
  product: Products;

  @Column()
  amount: number;
}
