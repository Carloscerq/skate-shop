import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { IsEmail, IsNotEmpty, IsInt } from "class-validator";
import { Orders } from "../orders/orders.entity";

@Entity()
export class Clients {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  address: string;

  @Column({ nullable: true })
  complement?: string;

  @Column()
  @IsInt()
  telephone: number;

  @OneToMany(() => Orders, (order) => order.client)
  orders: Orders[];
}
