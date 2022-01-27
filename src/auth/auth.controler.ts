import { Router, Response, Request } from "express";
import { AuthService } from "./auth.service";

export const authRouter = Router();
const authService = new AuthService();

authRouter.post(
	"/",
	authService.loginMiddleware,
	async (req: Request, res: Response): Promise<Response> => {
		return res.status(200).send("here");
	}
);
