import { getConnection } from "typeorm";
import { Orders } from "./orders.entity";
import { Clients } from "../clients/clients.entity";
import { Products } from "../products/products.entity";

export class OrdersService {
	async findClientFromOrder(id: string): Promise<Clients | undefined> {
		const order = await getConnection()
		.getRepository(Orders)
		.findOne({
			where: { id },
			relations: ["client"],
		});

		return order?.client;
	}

	async create(
		client: Clients,
		amount: number,
		product: Products
	): Promise<void> {
		await getConnection()
		.createQueryBuilder()
		.insert()
		.into(Orders)
		.values({
			amount,
			client,
			product,
		})
		.execute();
	}

	async findOne(id: string | number): Promise<Orders | undefined> {
		return await getConnection()
		.getRepository(Orders)
		.findOne({ where: { id } });
	}

	async setOrderPaid(id: string | number): Promise<void> {
		await getConnection()
		.createQueryBuilder()
		.update(Orders)
		.set({ isPaid: true })
		.where("id = :id", { id })
		.execute();
	}

	async delete(id: string | number): Promise<void> {
		await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Orders)
		.where("id = :id", { id })
		.execute();
	}

	async findAll(): Promise<Orders[]> {
		return await getConnection().getRepository(Orders).find();
	}
}
