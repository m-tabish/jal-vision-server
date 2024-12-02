import express, { Request, Response } from "express";
import verifyRole from "../middleware/roleMiddleware";

const 	router = express.Router();

router.get("/dashboard", verifyRole("ADMIN"), (req: Request, res: Response) => {
	res.json({ message: "Welcome to Admin Dashboard" });
});

export default router;
