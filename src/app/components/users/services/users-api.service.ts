import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User, UsersPage, ApiResponse, UserData } from '@users/models';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsersPage(): Observable<UsersPage> {
    const initialPage = 1;
    const url = `${this.apiUrl}?page=${initialPage}`;

    return this.fetchUsers(url);
  }

  private fetchUsers(url: string): Observable<UsersPage> {
    return this.http.get<ApiResponse>(url).pipe(
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

        if (response.page < response.total_pages) {
          const nextPage = response.page + 1;
          const nextPageUrl = `${this.apiUrl}?page=${nextPage}`;
          return this.fetchUsers(nextPageUrl).pipe(
            map((nextPageUsersPage: UsersPage) => {
              usersPage.result = usersPage.result.concat(
                nextPageUsersPage.result
              );
              return usersPage;
            })
          );
        } else {
          return of(usersPage);
        }
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
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<UserData>(url).pipe(
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
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred while adding user:', error);
        return throwError('Failed to add user. Please try again later.');
      })
    );
  }

  deleteUser(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<User>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred while deleting user:', error);
        return throwError('Failed to delete user. Please try again later.');
      })
    );
  }

  updateUser(userId: number, user: User): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    const userUpdated = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return this.http.put<User>(url, userUpdated).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred while updating user:', error);
        return throwError('Failed to update user. Please try again later.');
      })
    );
  }
}
