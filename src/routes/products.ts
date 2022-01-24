import { Request, Response, Router } from "express";
import { Products } from "../entities/products";
import { getConnection } from "typeorm";

export const productsRouter = Router();

productsRouter.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const { name, price, amountInStock, description } = req.body;

    if (!name || !price || !amountInStock) {
      return res.status(400).send({ error: "missing params" });
    }

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

    return res.status(200).send();
  }
);

productsRouter.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const users = await getConnection().getRepository(Products).find();

    return res.status(200).send(users);
  }
);
