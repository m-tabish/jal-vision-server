import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import sessionMiddleware from "./middleware/sessionMiddleware";
import adminRoutes from "./routes/admin";
import districtRoutes from "./routes/district";
import stateRoutes from "./routes/state";
import insertCentralData from "./utils/insert";
import readCentralData from "./utils/read";
import updateCentralData from "./utils/update";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(sessionMiddleware);

//Dummy data
const central_data = {
	id: "3",
	state_ut: "Uttar Pradesh",
	tehsil_block: "Bhadohi",
	latitude: 25.3812,
	longitude: 82.5687,
	well_site_type: "Borewell",
	water_level: 62,
};

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

// app.post("/insert", async (req: Request, res: Response): Promise<void> => {
// 	const data = req.body.data;
// 	console.log(data);
// 	const result = await insertCentralData(data);
// 	res.send(result);
// });

// app.post("/update", async (req: Request, res: Response): Promise<void> => {
// 	try {
// 		const data = req.body.data;
// 		console.log(data);
// 		if (!central_data) {
// 			res.status(400).send("Invalid Input");
// 		}
// 		const result = await updateCentralData(central_data);
// 		res.send(result);
// 	} catch (error) {
// 		res.status(500).send(error);
// 	}
// });

// app.get(
// 	"/read/:id/:authority",
// 	async (req: Request, res: Response): Promise<void> => {
// 		const id = req.params.id;
// 		console.log(id + " s");

// 		const result = await readCentralData(id);
// 		res.send(result);
// 	}
// );

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
