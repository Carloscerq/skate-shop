import { Request, Response, Router } from "express";
import { ProductsService } from "./products.service";

export const productsRouter = Router();
const productService = new ProductsService();

productsRouter.post(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
		const { name, price, amountInStock, description } = req.body;

		if (!name || !price || !amountInStock) {
			return res.status(400).send({ error: "missing params" });
		}

		productService.create(name, price, amountInStock, description);

		return res.status(200).send();
	}
);

productsRouter.get(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
		return res.status(200).send(await productService.getAll());
	}
);
