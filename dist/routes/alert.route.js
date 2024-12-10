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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const email_1 = __importDefault(require("../utils/email"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/anomaly", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state, district, tehsilBlock, name, villageName, siteName, latitude, longitude, wellSiteType, waterLevel, alertType, alertMessage, } = req.body;
    try {
        // Validate alertType
        if (!["NO_DATA", "ANOMALY", "BATTERY_LOW"].includes(alertType)) {
            return res.status(400).json({ error: "Invalid alert type" });
        }
        // Insert data into the Alert table
        const alert = yield prisma.alert.create({
            data: {
                state,
                district,
                tehsilBlock,
                name,
                villageName,
                siteName,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                wellSiteType,
                waterLevel: waterLevel ? parseFloat(waterLevel) : null,
                alertType,
                alertMessage,
            },
        });
        // Notify admins via email
        const emails = ["kaustubhpandey44@gmail.com"]; // Add your admin emails here
        for (const email of emails) {
            yield (0, email_1.default)({
                to: email,
                subject: `ALERT: ${alertType}`,
                text: `Alert Details:\n\n
        State/UT: ${state}\n
        District: ${district}\n
        Tehsil/Block: ${tehsilBlock}\n
        Village Name: ${villageName}\n
        Site Name: ${siteName}\n
        Latitude: ${latitude}\n
        Longitude: ${longitude}\n
        Well Site Type: ${wellSiteType}\n
        Water Level: ${waterLevel || "N/A"}\n
        Alert Type: ${alertType}\n
        Alert Message: ${alertMessage}`,
            });
        }
        res.status(200).json({ message: "Alert created and emails sent!", alert });
    }
    catch (error) {
        console.error("Error processing anomaly alert:", error);
        res.status(500).json({ error: "Failed to process anomaly alert" });
    }
}));
exports.default = router;
