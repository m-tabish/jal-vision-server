import express, { Request, Response } from "express";
import verifyRole from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/dashboard", verifyRole("STATE"), (req: Request, res: Response) => {
	res.json({ message: "Welcome to State Dashboard" });
});

export default router;
