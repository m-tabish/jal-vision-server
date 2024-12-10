import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import sessionMiddleware from "./middleware/sessionMiddleware";
import adminRoutes from "./routes/admin";
import districtRoutes from "./routes/district";
import stateRoutes from "./routes/state";
import insertCentralData from "./utils/insert";
import { User } from "./interfaces_types/index";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(sessionMiddleware);

app.get("/", async (req: Request, res: Response) => {
	res.send("Hello World");
});

const prisma = new PrismaClient();

app.post("/login", async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const user = await prisma.user.findUnique({
		where: { username },
	});
	if (!user || user.password !== password) {
		res.status(500).send("Invalid Credentials");
	} else {
		req.session.user = { id: user.id, role: user.role };
		res.json({ message: "Login successful", role: user.role });
	}
});
app.use("/central", adminRoutes);
app.use("/state", stateRoutes);
app.use("/district", districtRoutes);

// Centrall Table
app.post("/insert", async (req: Request, res: Response): Promise<void> => {
	const data = req.body.data;
	if (!data) {
		res.status(400).send("Invalid Input");
		return;
	}
	console.log(data);
	const result = await insertCentralData(data);
	res.send(result);
});

// User table
app.post("/user", async (req: Request, res: Response) => {
	const user = req.body.user;
	try {
		if (!user) {
			res.status(400).send("Invalid input");
		}
		console.log(user);

		const newUser = await prisma.user.create({	
			data: user,
		});
		res.status(201).send(newUser);
	} catch (error) {
		res.status(400).send("Error in entering User" + error);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
