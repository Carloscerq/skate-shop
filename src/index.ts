import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import dotenv from "dotenv";
import { clientRouter } from "./routes/clients";
import { productsRouter } from "./routes/products";
import { Clients } from "./entities/clients";
import { Orders } from "./entities/orders";
import { Products } from "./entities/products";


dotenv.config();
const app = express();
const port = process.env.HTTP_PORT || "3000";

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

createConnection({
  type: "mysql",
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [Clients, Products, Orders],
});

app.use("/clients", clientRouter);
app.use("/products", productsRouter)
app.listen(port, () => console.log(`Server running on port ${port}`));
