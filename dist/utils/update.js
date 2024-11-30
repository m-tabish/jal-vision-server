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
const updateCentralData = (_new_central_data) => __awaiter(void 0, void 0, void 0, function* () {
    let res;
    if (!_new_central_data) {
        return "No data";
    }
    // Inserting each data of the village into central_table
    yield prisma.central_Data_Schema.upsert({
        where: { id: _new_central_data.id },
        update: {
            water_level: _new_central_data.water_level,
        },
        create: {
            id: _new_central_data.id, // Include the ID when creating
            state_ut: _new_central_data.state_ut,
            tehsil_block: _new_central_data.tehsil_block,
            latitude: _new_central_data.latitude,
            longitude: _new_central_data.longitude,
            well_site_type: _new_central_data.well_site_type,
            water_level: _new_central_data.water_level,
        },
    });
    return "Data entered";
});
exports.default = updateCentralData;
