import { Request, Response, Router } from "express";
import { ClientsService } from "../clients/clients.service";
import { ProductsService } from "../products/products.service";
import { OrdersService } from "./orders.service";
import { AuthService } from "../auth/auth.service";

export const ordersRouter = Router();
const clientService = new ClientsService();
const productService = new ProductsService();
const orderService = new OrdersService();
const authService = new AuthService();

ordersRouter.post(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
		const { email, productId, amount } = req.body;

		if (!email || !productId || !amount) {
			return res.status(400).send({ error: "missing param" });
		}

		const client = await clientService.findOne(email);

		const product = await productService.findOne(productId);

		if (product && client && amount - product.amountInStock > 0) {
			await productService.removeFromStock(product, amount);

			await orderService.create(client, amount, product);

			return res.status(200).send();
		}

		return res.status(400).send();
	}
);

ordersRouter.post(
	"/paid",
	authService.JwtTokenMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		const { orderId } = req.body;

		if (!orderId) return res.status(400).send({ error: "missing param" });

		const order = await orderService.findOne(orderId);

		if (order) {
			await orderService.setOrderPaid(order.id);

			return res.status(200).send();
		}

		return res.status(400).send();
	}
);

ordersRouter.delete(
	"/",
	authService.JwtTokenMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		const { orderId } = req.body;

		if (!orderId) return res.status(400).send({ error: "missing param" });

		const order = await orderService.findOne(orderId);

		if (order) {
			await productService.addInStock(order.product, order.amount);

			await orderService.delete(order.id);

			return res.status(200).send();
		}

		return res.status(400).send();
	}
);

ordersRouter.get(
	"/",
	authService.JwtTokenMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		const orders = await orderService.findAll();

		return res.status(200).send(orders);
	}
);

ordersRouter.get(
	"/products/:orderId",
	authService.JwtTokenMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		if (!req.params.orderId) {
			return res.status(400).send();
		}

		const product = await productService.findProductFromOrder(
			req.params.orderId
		);

		if (product) return res.status(200).send({ product });

		return res.status(400).send();
	}
);
