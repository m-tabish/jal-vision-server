import dotenv from "dotenv";
import express, { Request, Response } from "express";
import insertCentralData from "./utils/insert";
import readCentralData from "./utils/read";
import updateCentralData from "./utils/update";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
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
app.post("/insert", async (req: Request, res: Response): Promise<void> => {
	const result = await insertCentralData(central_data);
	res.send(result);
});

app.post("/update", async (req: Request, res: Response): Promise<void> => {
	const result = await updateCentralData(central_data);
	res.send(result);
});

app.get("/read/:id", async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	console.log(id + " s");

	const result = await readCentralData(id);
	res.send(result);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
