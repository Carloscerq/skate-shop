import { sign, verify, JwtPayload } from "jsonwebtoken";
import { config as dotEnvConfig } from "dotenv";
import { Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { Clients as ClientsEntity } from "../clients/clients.entity";
import { getConnection } from "typeorm";
import { JwtDecodedRequest } from "./dto/JwtDecodedRequest.dto";
import { JwtTokens } from "./dto/JwtTokens";
import { JwtTokenInfo } from "./dto/JwtTokenInfo";

dotEnvConfig();

export class AuthService {
	secretKey = process.env.SECRET_KEY || "private_key";
	expireTime = process.env.TOKEN_EXPIRE_TIME || "15m";
	expireRefreshToken = process.env.REFRESH_TOKEN_EXPIRE_TIME || "1h";

	private async signJwtToken(
		data: object | string,
		expireTime: string | number = this.expireTime
	): Promise<string | JwtPayload> {
		return await sign(data, this.secretKey, { expiresIn: expireTime });
	}

	async verifyJwtToken(
		token: string
	): Promise<boolean | JwtPayload | string> {
		try {
			const decodedToken = await verify(token, this.secretKey);
			return decodedToken;
		} catch (err) {
			return false;
		}
	}

	async loginMiddleware(
		req: JwtDecodedRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | NextFunction | void> {
		const { email, password } = req.body;

		if (!email || !password) return res.status(400).send("Missing params");

		const user = await getConnection()
			.getRepository(ClientsEntity)
			.findOne({ where: { email } });

		if (user && (await compare(password, user?.password))) {
			req.user = user;
			return next();
		}

		return res.status(400).send("Email/Password wrong");
	}

	async JwtTokenMiddleware(
		req: JwtDecodedRequest,
		res: Response,
		next: NextFunction
	): Promise<Response | NextFunction | void> {
		const token = req.headers.authorization;

		if (!token) return res.status(401).send("Missing token");

		const decodedToken = <JwtTokenInfo>await this.verifyJwtToken(token);

		if (decodedToken && decodedToken?.token) {
			req.user = decodedToken;
			next();
			return;
		}

		return res.status(401).send("Token expired");
	}

	async generateJwtToken(data: object, refreshToken = false): Promise<JwtTokens> {
		const token = await this.signJwtToken({ ...data, token: true });

		if (refreshToken) {
			const refreshToken = await this.signJwtToken(
				{ ...data, token: false },
				this.expireRefreshToken
			);

			return {
				token,
				refreshToken,
			};
		}

		return {
			token,
		};
	}
}
