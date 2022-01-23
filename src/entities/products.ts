import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsInt } from "class-validator";
import { ProductInOrder } from "../dto/ProductInOrder";

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
}
