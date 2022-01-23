import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, IsInt } from "class-validator";
import { hash } from "bcrypt";
import { Order } from "./orders";

@Entity()
export class Client {
	@PrimaryGeneratedColumn("uuid")
	id: number;

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
	complement?: string | null;

	@Column()
	@IsInt()
	telephone: number;

	@OneToMany(() => Order, order => order.client)
	orders: Order[];

	@BeforeInsert()
	async hashData() {
		this.password = await hash(this.password, 10);
	}
}
