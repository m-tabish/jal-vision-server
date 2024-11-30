export interface Central_Data_Schema {
	id: string;
	state_ut: string;
	tehsil_block: string;
	latitude: number;
	longitude: number;
	well_site_type: string;
	water_level: number;
}
export interface Central_Data {
	central_data: Central_Data_Schema[];
}
