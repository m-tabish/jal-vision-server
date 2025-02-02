import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import fs from "fs";
import PDFDocument from "pdfkit";
import { Role, User } from "./interfaces_types/index";
import sessionMiddleware from "./middleware/sessionMiddleware";
import adminRoutes from "./routes/admin";
import districtRoutes from "./routes/district";
import stateRoutes from "./routes/state";
import insertCentralData from "./utils/insert";
const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
dotenv.config();

const PORT =  3000;
app.use(express.json());
app.use(sessionMiddleware);

app.get("/", async (req: Request, res: Response) => {
	res.send("Hello Worlds");
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
app.get("/generate_report", (req: Request, res: Response) => {
	const doc = new PDFDocument();
	doc.pipe(fs.createWriteStream("Report.pdf"));
	doc.text("Hello world!");

	const data = [
		{
			id: 2,
			dwlrId: "CGWKOL0166",
			location: "Soyat(Deep), Susner, Susner, Agarmalwa, Madhya Pradesh",
			lastRecorded: "04-01-2024 12:00",
			currentStatus: "Active",
			waterLevel: -8.25,
			temperature: 28.51,
			rainfall: 943.101,
			pH: -11.9,
			dissolvedOxygen: -26.9,
			batteryVoltage: 3.6,
		},

		// Additional data entries...
	];

	const latestEntry = data[data.length - 1];
	const {
		location,
		temperature,
		rainfall,
		pH,
		dissolvedOxygen,
		batteryVoltage,
	} = latestEntry;
	const time = latestEntry.lastRecorded;
	const waterLevel = latestEntry.waterLevel;
	const wellDepth = "Depth data not provided"; // Placeholder as depth is not in the dataset

	if (
		!location ||
		!temperature ||
		!time ||
		waterLevel === undefined ||
		!wellDepth
	) {
		res.status(400).send("Missing required query parameters");
		return;
	}
	doc.text(`==============================`, { align: "center" });
	doc.text(`         WATER LEVEL REPORT    `, { align: "center" });
	doc.text(`==============================\n`);

	// Entry Details
	doc.text(`Entry Details:`, { underline: true });
	doc.text(`- ID: ${latestEntry.id}`);
	doc.text(`- DWLR ID: ${latestEntry.dwlrId}`);
	doc.text(`- Location: ${location}`);
	doc.text(`- Last Recorded: ${time}`);
	doc.text(`- Current Status: ${latestEntry.currentStatus}`);
	doc.text(`\n`);

	// Measurements Section
	doc.text(`Measurements:`, { underline: true });
	doc.text(`- Water Level: ${waterLevel} m`);
	doc.text(`- Temperature: ${temperature} °C`);
	doc.text(`- Rainfall: ${rainfall} mm`);
	doc.text(`- pH Level: ${pH}`);
	doc.text(`- Dissolved Oxygen: ${dissolvedOxygen} mg/L`);
	doc.text(`- Battery Voltage: ${batteryVoltage} V`);
	doc.text(`\n`);

	// Footer
	doc.text(`==============================`, { align: "center" });
	doc.text(`Report generated on: ${new Date().toLocaleString()}`, {
		align: "center",
	});
	doc.end();
	res.send("Report generated successfully");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
