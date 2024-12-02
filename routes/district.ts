import express, { Request, Response } from "express";
import verifyRole from "../middleware/roleMiddleware";

const router = express.Router();

router.get(
	"/dashboard",
	verifyRole("DISTRICT"),
	(req: Request, res: Response) => {
		res.json({ message: "Welcome to District Dashboard" });
	}
);

export default router;
