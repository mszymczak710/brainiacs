import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User, UsersPage, ApiResponse, UserData } from '@users/models';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UsersApiService {
	private apiUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};

	getUsersPage(): Observable<UsersPage> {
		const initialPage = 1;
		const url = `${this.apiUrl}/users?page=${initialPage}`;

		return this.http.get<ApiResponse>(url, this.httpOptions).pipe(
			switchMap((response: ApiResponse) => {
				const users: User[] = response.data.map((userData: UserData) => ({
					id: userData.id,
					firstName: userData.first_name,
					lastName: userData.last_name,
					email: userData.email,
					avatar: userData.avatar,
				}));

				const usersPage: UsersPage = {
					totalPages: response.total_pages,
					count: response.total,
					currentPage: response.page,
					pageSize: response.per_page,
					result: users,
				};

				if (response.page >= response.total_pages) {
					return of(usersPage);
				}

				const nextPage = response.page + 1;
				const nextPageUrl = `${this.apiUrl}/users?page=${nextPage}`;
				return this.http.get<ApiResponse>(nextPageUrl, this.httpOptions).pipe(
					map((nextPageResponse: ApiResponse) => {
						const nextPageUsers: User[] = nextPageResponse.data.map(
							(nextPageUserData: UserData) => ({
								id: nextPageUserData.id,
								firstName: nextPageUserData.first_name,
								lastName: nextPageUserData.last_name,
								email: nextPageUserData.email,
								avatar: nextPageUserData.avatar,
							})
						);

						usersPage.result.push(...nextPageUsers);
						return usersPage;
					})
				);
			}),
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred:', error);
				return throwError(
					() => 'Something went wrong. Please try again later.'
				);
			})
		);
	}

	getUser(userId: number): Observable<User> {
		const url = `${this.apiUrl}/users/${userId}`;
		return this.http.get<UserData>(url, this.httpOptions).pipe(
			map((response: any) => {
				const userData = response.data;
				return {
					id: userData.id,
					firstName: userData.first_name,
					lastName: userData.last_name,
					email: userData.email,
					avatar: userData.avatar,
				};
			}),
			catchError((error: HttpErrorResponse) => {
				console.error('Error getting user:', error);
				return throwError(() => 'Failed to fetch user details.');
			})
		);
	}

	addUser(user: User): Observable<User> {
		const url = `${this.apiUrl}/users/`;
		return this.http.post<User>(url, user, this.httpOptions).pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred while adding user:', error);
				return throwError(() => 'Failed to add user. Please try again later.');
			})
		);
	}

	deleteUser(userId: number): Observable<User> {
		const url = `${this.apiUrl}/users/${userId}`;
		return this.http.delete<User>(url).pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred while deleting user:', error);
				return throwError('Failed to delete user. Please try again later.');
			})
		);
	}

	updateUser(userId: number, user: User): Observable<User> {
		const url = `${this.apiUrl}/users/${userId}`;
		const userUpdated = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		};
		return this.http.put<User>(url, userUpdated, this.httpOptions).pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred while updating user:', error);
				return throwError(
					() => 'Failed to update user. Please try again later.'
				);
			})
		);
	}
}
