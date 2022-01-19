import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.HTTP_PORT || "3000";

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

createConnection({
	type: "mysql",
	database: process.env.MYSQL_DATABASE,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	logging: true,
	synchronize: true,
	entities: []
});

app.listen(port, () => console.log(`Server running on port ${port}`));
