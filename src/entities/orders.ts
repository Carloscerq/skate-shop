import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Clients } from "./clients";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ default: true })
  isPaid: boolean;

  @ManyToOne(() => Clients, (client) => client.orders)
  client: Clients;

  @Column()
  productsId: number;

  @Column()
  amount: number;
}
