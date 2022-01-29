import { Request, Response, Router } from "express";
import { Clients } from "./clients.entity";
import { getConnection } from "typeorm";
import { ClientsService } from "./clients.service";
import { OrdersService } from "../orders/orders.service";
import { AuthService } from "../auth/auth.service";

export const clientRouter = Router();
const clientsService = new ClientsService();
const ordersService = new OrdersService();
const authService = new AuthService();

clientRouter.get(
	"/",
	authService.JwtTokenMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		const users = await getConnection().getRepository(Clients).find();

		return res.status(200).send(users);
	}
);

clientRouter.post(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
		const { name, email, password, telephone, address, complement } =
			req.body;

		if (
			!name ||
			!email ||
			!password ||
			!telephone ||
			!address ||
			!complement
		) {
			res.status(400).send({ error: "missing params" });
		}

		const createdClient = await clientsService.create(req.body);

		if (!createdClient) return res.status(400).send("email already in use");

		return res.status(200).send();
	}
);

clientRouter.post(
	"/update",
	authService.JwtTokenMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		const { email } = req.body;

		if (!email) {
			res.status(400).send({ error: "missing params" });
		}

		const updatedClient = await clientsService.update(email, req.body);

		if (updatedClient) return res.status(200).send();

		return res.status(400).send({ error: "not a valid email" });
	}
);

clientRouter.delete(
	"/",
	authService.JwtTokenMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		const { email } = req.body;

		if (!email) {
			res.status(400).send({ error: "missing params" });
		}

		const deletedClient = await clientsService.delete(email);

		if (deletedClient) return res.status(200).send();

		return res.status(400).send({ error: "not a valid email" });
	}
);

clientRouter.get(
	"/order/:orderId",
	authService.JwtTokenMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		if (!req.params.orderId) {
			return res.status(400).send();
		}

		const client = await ordersService.findClientFromOrder(
			req.params.orderId
		);

		if (client) return res.status(200).send({ client });

		return res.status(400).send();
	}
);
