import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import sessionMiddleware from "./middleware/sessionMiddleware";
import adminRoutes from "./routes/admin";
import districtRoutes from "./routes/district";
import stateRoutes from "./routes/state";
import insertCentralData from "./utils/insert";
import { User, Role } from "./interfaces_types/index";
import cors from "cors";
const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200,
};
import jsreport from "jsreport-core";
const jsreportInstance = jsreport();

const app = express();
app.use(cors(corsOptions));
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(sessionMiddleware);

app.get("/", async (req: Request, res: Response) => {
	res.send("Hello World");
});

const prisma = new PrismaClient();

app.use("/central", adminRoutes);
app.use("/state", stateRoutes);
app.use("/district", districtRoutes);

// Central Table
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

app.post("/insert_all_users", async (req: Request, res: Response) => {
	const users = req.body.users;
	try {
		if (!users) {
			res.status(400).send("Invalid input");
			return;
		}
		users.map(async (user: User) => {
			const userData = { ...user, role: user.role as Role };
			await prisma.user.create({
				data: userData,
			});
		});
		res.status(201).send("Data entered");
		return;
	} catch (error) {
		res.status(400).send("Error in entering User" + error);
	}
});

app.get("/users/delete_all", async (req: Request, res: Response) => {
	try {
		const delete_success = await prisma.user.deleteMany({});

		res
			.status(200)
			.send("Deleted all record: " + JSON.stringify(delete_success));
		return;
	} catch (error) {
		res.status(500).send("error deleting all users: " + error);
	}
});

// Generate Reports
app.get("/generate-report", async (req: Request, res: Response) => {
	await jsreportInstance.init();
	try {
		const out = await jsreportInstance.render({
			template: {
				content: "<h1>Hello world</h1>",
				engine: "handlebars",
				recipe: "chrome-pdf",
			},
		});
		res.setHeader("Content-Type", "application/pdf");
		out.stream.pipe(res);
	} catch (e) {
		if (e instanceof Error) {
			res.status(500).send(e.message);
		} else {
			res.status(500).send("Unknown error");
		}
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
