import { Router, Response, Request } from "express";
import { AuthService } from "./auth.service";
import { JwtDecodedRequest } from "./dto/JwtDecodedRequest.dto";
import { JwtTokenInfo } from "./dto/JwtTokenInfo";

export const authRouter = Router();
const authService = new AuthService();

authRouter.post(
	"/",
	authService.loginMiddleware,
	async (req: JwtDecodedRequest, res: Response): Promise<Response> => {
		const payload = {
			email: req?.user?.email,
			name: req?.user?.name,
			telephone: req?.user?.telephone,
		};

		return res
			.status(200)
			.send(await authService.generateJwtToken(payload, true));
	}
);

authRouter.post(
	"/refresh-token",
	async (req: Request, res: Response): Promise<Response> => {
		const { refreshToken } = req.body;

		if (!refreshToken) return res.status(400).send("Missing params");

		const decodedToken = <JwtTokenInfo>(
			await authService.verifyJwtToken(refreshToken)
		);

		if (!decodedToken) return res.status(400).send("Expired refresh token");
		if (decodedToken.token) return res.status(400).send("Wrong token");

		const payload = {
			email: decodedToken.email,
			name: decodedToken.name,
			telephone: decodedToken.telephone,
		};

		return res
			.status(200)
			.send(await authService.generateJwtToken(payload, false));
	}
);
