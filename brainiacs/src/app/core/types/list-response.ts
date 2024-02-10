export class ListResponse<T> {
  data: T[];
  total_pages: number;
  total: number;
  page: number;
  per_page: number;
}

export class ReadableListResponse<T> {
  result: T[];
  totalPages: number;
  count: number;
  currentPage: number;
  pageSize: number;
}