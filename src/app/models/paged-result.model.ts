export class PagedResult<T> {
	result: T[];
	totalPages: number;
	count: number;
	currentPage: number;
	pageSize: number;
}
