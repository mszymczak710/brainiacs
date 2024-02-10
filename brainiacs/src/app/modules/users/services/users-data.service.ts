import { User, UserResponse, UsersPage } from 'src/app/modules/users/types';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable()
export class UsersDataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  fetchUsersPage(page: number): Observable<UsersPage> {
    const url = `${this.apiUrl}/users?page=${page}`;

    return this.http.get<UserResponse>(url, this.httpOptions)
      .pipe(
        map(response => this.mapResponseToUsersPage(response)),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  getUsersPage(): Observable<UsersPage> {
    return this.fetchUsersPage(1).pipe(
      switchMap((initialPage) => {
        if (initialPage.currentPage >= initialPage.totalPages) {
          return of(initialPage);
        }
        return this.fetchUsersPage(initialPage.currentPage + 1).pipe(
          map((nextPage) => {
            initialPage.result.push(...nextPage.result);
            return initialPage;
          })
        );
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private mapResponseToUsersPage(response: UserResponse): UsersPage {
    const users: User[] = response.data.map(user => this.mapUser(user));
    return {
      totalPages: response.total_pages,
      count: response.total,
      currentPage: response.page,
      pageSize: response.per_page,
      result: users,
    };
  }

  private mapUser(user: User): User {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar: user.avatar,
    };
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong. Please try again later.');
  }

  addUser(data: User): Observable<User> {
    const url = `${this.apiUrl}/users/`;
    return this.http.post<User>(url, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred while adding user:', error);
        return throwError(() => 'Failed to add user. Please try again later.');
      })
    );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/users/${id}`;
    return this.http.delete<User>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred while deleting user:', error);
        return throwError(
          () => 'Failed to delete user. Please try again later.'
        );
      })
    );
  }

  updateUser(id: number, data: User): Observable<User> {
    const url = `${this.apiUrl}/users/${id}`;
    return this.http.patch<User>(url, data, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred while updating user:', error);
        return throwError(
          () => 'Failed to update user. Please try again later.'
        );
      })
    );
  }
}
