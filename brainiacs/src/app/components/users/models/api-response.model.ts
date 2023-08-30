export interface ApiResponse {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: UserData[];
}

export interface UserData {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}
