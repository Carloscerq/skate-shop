import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface JwtDecodedRequest extends Request {
	user?: object | string | JwtPayload;
}
