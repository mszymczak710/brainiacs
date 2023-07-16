import { PagedResult } from '@models';

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	avatar: string;
}

export class UsersPage extends PagedResult<User> {}
