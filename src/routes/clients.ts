import { Request, Response, Router } from "express";
import { Clients } from "../entities/clients";
import { getConnection } from "typeorm";
import { hash } from "bcrypt";
import { Orders } from "../entities/orders";

export const clientRouter = Router();

clientRouter.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const users = await getConnection().getRepository(Clients).find();

    return res.status(200).send(users);
  }
);

clientRouter.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, telephone, address, complement } = req.body;

    if (!name || !email || !password || !telephone || !address || !complement) {
      res.status(400).send({ error: "missing params" });
    }

    const hashedPassword = await hash(password, 10);

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Clients)
      .values({
        name,
        email,
        password: hashedPassword,
        telephone,
        address,
        complement,
      })
      .execute();

    return res.status(200).send();
  }
);

clientRouter.post(
  "/update",
  async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    if (!email) {
      res.status(400).send({ error: "missing params" });
    }

    const user = await getConnection()
      .getRepository(Clients)
      .findOne({ where: { email } });

    if (user) {
      await getConnection()
        .createQueryBuilder()
        .update(Clients)
        .set(req.body)
        .where("id = :id", { id: user.id })
        .execute();

      return res.status(200).send();
    }

    return res.status(400).send({ error: "not a valid email" });
  }
);

clientRouter.delete(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    if (!email) {
      res.status(400).send({ error: "missing params" });
    }

    const user = await getConnection()
      .getRepository(Clients)
      .findOne({ where: { email } });

    if (user) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Clients)
        .where("id = :id", { id: user.id })
        .execute();

      return res.status(200).send();
    }

    return res.status(400).send({ error: "not a valid email" });
  }
);

clientRouter.get(
  "/order/:orderId",
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.params.orderId) {
      return res.status(400).send();
    }

    const order = await getConnection()
      .getRepository(Orders)
      .findOne({ where: { id: req.params.orderId }, relations: ["client"] });

    if (order) return res.status(200).send({ client: order.client });

    return res.status(400).send();
  }
);
