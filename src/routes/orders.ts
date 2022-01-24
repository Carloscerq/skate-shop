import { Request, Response, Router } from "express";
import { Clients } from "../entities/clients";
import { Orders } from "../entities/orders";
import { getConnection } from "typeorm";

const ordersRouter = Router();
