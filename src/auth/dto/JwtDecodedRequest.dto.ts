import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Clients } from "../../clients/clients.entity";

export interface JwtDecodedRequest extends Request {
	user?: Clients | JwtPayload;
}
