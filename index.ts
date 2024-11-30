import express, { Request, Response } from "express";
import dotenv from "dotenv";
import insertCentralData from "./utils/insert";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const central_data = {
	id: "1",
	state_ut: "Uttar Pradesh",
	tehsil_block: "Bhadohi",
	latitude: 25.3812,
	longitude: 82.5687,
	well_site_type: "Borewell",
	water_level: 100,
};
app.get("/", async (req: Request, res: Response) => {
	await insertCentralData(central_data);
	res.send("Hello World");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
