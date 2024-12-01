import { PrismaClient } from "@prisma/client";
import { Central_Data_Schema } from "../interfaces_types";
const prisma = new PrismaClient();

const updateCentralData = async (
	_new_central_data: Central_Data_Schema | null
): Promise<Central_Data_Schema | String| Error> => {
	let res;
	if (!_new_central_data) {
		return "No data";
	}

	// Inserting each data of the village into central_table
	res = await prisma.central_Data_Schema.upsert({
		where: { id: _new_central_data.id },
		update: {
			state_ut: _new_central_data.state_ut,
			tehsil_block: _new_central_data.tehsil_block,
			latitude: _new_central_data.latitude,
			longitude: _new_central_data.longitude,
			well_site_type: _new_central_data.well_site_type,
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
	if (!res) {
		return new Error("Data not updated");
	}
	return res ;
};
export default updateCentralData;
