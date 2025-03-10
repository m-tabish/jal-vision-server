import { PrismaClient } from "@prisma/client";
import { central_Data } from "../interfaces_types";
const prisma = new PrismaClient();

const insertCentralData = async (
	_single_central_data: central_Data | null
): Promise<Error | central_Data | String> => {
	if (!_single_central_data || Array.isArray(_single_central_data)) {
		return new Error("No data");
	}

	// Validate the input data
	const { state_ut, tehsil_block, latitude, longitude, well_site_type, water_level, state_id, district_id } = _single_central_data;

	if (
		typeof state_ut !== 'string' ||
		typeof tehsil_block !== 'string' ||
		typeof latitude !== 'number' ||
		typeof longitude !== 'number' ||
		typeof well_site_type !== 'string' ||
		typeof water_level !== 'number' ||
		typeof state_id !== 'number' ||
		typeof district_id !== 'number'
	) {
		return new Error("Invalid input data");
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
