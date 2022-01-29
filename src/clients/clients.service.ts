import { Clients as ClientsEntity } from "./clients.entity";
import { getConnection } from "typeorm";
import { createClient } from "./dto/createClient.dto";
import { hash } from "bcrypt";

export class ClientsService {
	async findOne(email: string): Promise<ClientsEntity | undefined> {
		return await getConnection()
			.getRepository(ClientsEntity)
			.findOne({ where: { email: email } });
	}

	async create(client: createClient): Promise<boolean> {
		const emailInUse = this.findOne(client.email);

		if (!emailInUse) return false;

		const hashedPassword = await hash(client.password, 10);

		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(ClientsEntity)
			.values({
				...client,
				password: hashedPassword,
			})
			.execute();

		return true;
	}

	async update(email: string, data: object): Promise<boolean> {
		const user = await this.findOne(email);

		if (user) {
			await getConnection()
				.createQueryBuilder()
				.update(ClientsEntity)
				.set(data)
				.where("id = :id", { id: user.id })
				.execute();

			return true;
		}

		return false;
	}

	async delete(email: string): Promise<boolean> {
		const user = await this.findOne(email);

		if (user) {
			await getConnection()
				.createQueryBuilder()
				.delete()
				.from(ClientsEntity)
				.where("id = :id", { id: user.id })
				.execute();

			return true;
		}

		return false;
	}
}
