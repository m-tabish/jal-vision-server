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
const readCentralData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let res;
    try {
        if (!id) {
            return new Error("No id");
        }
        res = yield prisma.central_Data_Schema.findUnique({
            where: { id: id },
        });
        console.log(id);
        if (!res) {
            return new Error("Data not found");
        }
        return res;
    }
    catch (e) {
        return new Error("An error occurred while fetching data");
    }
});
exports.default = readCentralData;
