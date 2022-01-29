import { getConnection } from "typeorm";
import { Products } from "./products.entity";
import { Orders } from "../orders/orders.entity";

export class ProductsService {
	async findOne(id: string): Promise<Products | undefined> {
		return await getConnection()
			.getRepository(Products)
			.findOne({ where: { id } });
	}

	async removeFromStock(product: Products, amount: number): Promise<void> {
		await getConnection()
			.createQueryBuilder()
			.update(Products)
			.set({ amountInStock: product?.amountInStock - amount })
			.where("id = :id", { id: product.id })
			.execute();

		return;
	}

	async addInStock(product: Products, amount: number): Promise<void> {
		await getConnection()
			.createQueryBuilder()
			.update(Products)
			.set({ amountInStock: product?.amountInStock + amount })
			.where("id = :id", { id: product.id })
			.execute();

		return;
	}

	async findProductFromOrder(
		orderId: string | number
	): Promise<Products | undefined> {
		const order = await getConnection()
			.getRepository(Orders)
			.findOne({
				where: { id: orderId },
				relations: ["product", "client"],
			});

		return order?.product;
	}

	async create(
		name: string,
		price: number,
		amountInStock: number,
		description: string | undefined
	): Promise<void> {
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Products)
			.values({
				name,
				price,
				amountInStock,
				description,
			})
			.execute();

		return;
	}

	async getAll(): Promise<Products[]> {
		return await getConnection().getRepository(Products).find();
	}
}
