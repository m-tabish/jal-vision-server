import { PrismaClient } from "@prisma/client";
import { central_Data } from "../interfaces_types";
const prisma = new PrismaClient();

const insertCentralData = async (
	_single_central_data: central_Data | null
): Promise<Error | central_Data | String> => {
	if (!_single_central_data || Array.isArray(_single_central_data)) {
		return new Error("No data");
	}

	// Inserting each data of the village into central_table
	try {
		await prisma.central_Data.create({
			data: _single_central_data,
		});
	} catch (error) {
		return new Error("" + error);
	}

	return "Data entered";
};
export default insertCentralData;
