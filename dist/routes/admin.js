"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const router = express_1.default.Router();
router.get("/dashboard", (0, roleMiddleware_1.default)("ADMIN"), (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard" });
});
exports.default = router;
