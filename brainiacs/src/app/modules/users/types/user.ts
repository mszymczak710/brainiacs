import { ListResponse, ReadableListResponse } from 'src/app/core/types';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserResponse extends ListResponse<User> {}
export interface UsersPage extends ReadableListResponse<User> {}
