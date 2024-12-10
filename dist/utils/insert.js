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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertCentralData = (_single_central_data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_single_central_data || Array.isArray(_single_central_data)) {
        return new Error("No data");
    }
    // Inserting each data of the village into central_table
    yield prisma.central_Data.create({
        data: {
            id: _single_central_data.id,
            state_ut: _single_central_data.state_ut,
            tehsil_block: _single_central_data.tehsil_block,
            latitude: _single_central_data.latitude,
            longitude: _single_central_data.longitude,
            well_site_type: _single_central_data.well_site_type,
            water_level: _single_central_data.water_level,
        },
    });
    return "Data entered";
});
exports.default = insertCentralData;
