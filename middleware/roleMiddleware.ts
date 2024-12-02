import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";

declare module "express-session" {
	interface Session {
		user?: { id: number; role: string };
	}
}

const verifyRole =
	(role: string) =>
	(req: Request, res: Response, next: NextFunction): any => {
		const user = req.session?.user;

		if (!user || user.role !== role) {
			return res.status(403).json({ message: "Access Denied" });
		}

		next();
	};

export default verifyRole;
