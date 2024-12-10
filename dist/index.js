"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const sessionMiddleware_1 = __importDefault(require("./middleware/sessionMiddleware"));
const admin_1 = __importDefault(require("./routes/admin"));
const district_1 = __importDefault(require("./routes/district"));
const state_1 = __importDefault(require("./routes/state"));
const alert_route_1 = __importDefault(require("./routes/alert.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(sessionMiddleware_1.default);
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
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello World");
}));
const prisma = new client_1.PrismaClient();
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: { username },
    });
    if (!user || user.password !== password) {
        res.status(500).send("Invalid Credentials");
    }
    else {
        req.session.user = { id: user.id, role: user.role };
        res.json({ message: "Login successful", role: user.role });
    }
}));
//alert route
app.use("/api/alerts", alert_route_1.default);
app.use("/central", admin_1.default);
app.use("/state", state_1.default);
app.use("/district", district_1.default);
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
