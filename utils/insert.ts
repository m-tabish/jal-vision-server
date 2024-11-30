import { PrismaClient } from "@prisma/client";
import { Central_Data_Schema } from "../interfaces_types";
const prisma = new PrismaClient();

const insertCentralData = async (
	_single_central_data: Central_Data_Schema | null
): Promise<String> => {
	if (!_single_central_data || Array.isArray(_single_central_data)) {
		return "No data";
	}

	// Inserting each data of the village into central_table
	await prisma.central_Data_Schema.create({
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
};
export default insertCentralData;
