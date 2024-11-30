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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const insert_1 = __importDefault(require("./utils/insert"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const central_data = {
    id: "1",
    state_ut: "Uttar Pradesh",
    tehsil_block: "Bhadohi",
    latitude: 25.3812,
    longitude: 82.5687,
    well_site_type: "Borewell",
    water_level: 62,
};
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, insert_1.default)(central_data);
    res.send("Hello World");
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
