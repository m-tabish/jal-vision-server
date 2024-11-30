import { PrismaClient } from "@prisma/client";
import { Central_Data_Schema } from "../interfaces_types";
const prisma = new PrismaClient();

const readCentralData = async (
	id: string
): Promise<Central_Data_Schema | Error | String> => {
	let res;
	try {
		if (!id) {
			return new Error("No id");
		}
		res = await prisma.central_Data_Schema.findUnique({
			where: { id: id },
		});
		console.log(id);

		if (!res) {
			return new Error("Data not found");
		}
		return res;
	} catch (e) {
		return new Error("An error occurred while fetching data");
	}
};
export default readCentralData;
