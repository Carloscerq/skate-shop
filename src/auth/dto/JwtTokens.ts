import { JwtPayload } from "jsonwebtoken";

export interface JwtTokens {
	token: string | JwtPayload;
	refreshToken?: string | JwtPayload;
}
