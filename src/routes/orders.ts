import { Request, Response, Router } from "express";
import { Clients } from "../entities/clients";
import { Orders } from "../entities/orders";
import { Products } from "../entities/products";
import { getConnection } from "typeorm";

export const ordersRouter = Router();

ordersRouter.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const { email, productId, amount } = req.body;

    if (!email || !productId || !amount) {
      return res.status(400).send({ error: "missing param" });
    }

    const client = await getConnection()
      .getRepository(Clients)
      .findOne({ where: { email } });

    const product = await getConnection()
      .getRepository(Products)
      .findOne({ where: { id: productId } });

    if (product && client) {
      console.log("here");
      await getConnection()
        .createQueryBuilder()
        .update(Products)
        .set({ amountInStock: product?.amountInStock - amount })
        .where("id = :id", { id: product.id })
        .execute();

      await getConnection().createQueryBuilder().insert().into(Orders).values({
        amount,
        client,
        product,
      }).execute();

      return res.status(200).send();
    }

    return res.status(400).send();
  }
);

ordersRouter.post(
  "/paid",
  async (req: Request, res: Response): Promise<Response> => {
    const { orderId } = req.body;

    if (!orderId) return res.status(400).send({ error: "missing param" });

    const order = await getConnection()
      .getRepository(Orders)
      .findOne({ where: { id: orderId } });

    if (order) {
      await getConnection()
        .createQueryBuilder()
        .update(Orders)
        .set({ isPaid: true })
        .where("id = :id", { id: order.id })
        .execute();

      return res.status(200).send();
    }

    return res.status(400).send();
  }
);

ordersRouter.delete(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const { orderId } = req.body;

    if (!orderId) return res.status(400).send({ error: "missing param" });

    const order = await getConnection()
      .getRepository(Orders)
      .findOne({ where: { id: orderId } });

    if (order) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Orders)
        .where("id = :id", { id: order.id })
        .execute();

      return res.status(200).send();
    }

    return res.status(400).send();
  }
);

ordersRouter.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const orders = await getConnection().getRepository(Orders).find();

    return res.status(200).send(orders);
  }
);
