export interface central_Data {
	id?: number;
	state_ut: string;
	tehsil_block: string;
	latitude: number;
	longitude: number;
	well_site_type: string;
	water_level: number;
	state_id: number;
	district_id: number;
}
export interface User {
	id?: number;
	username: string;
	password: string;
	role: string;
}
