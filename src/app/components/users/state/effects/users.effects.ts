import { Injectable } from '@angular/core';
import * as UsersActions from '@users/state/actions/users.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, mergeMap, of, switchMap } from 'rxjs';
import { UsersApiService } from '@users/services';

@Injectable()
export class UsersEffects {
	loadUsersPage$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.loadUsersPage),
			switchMap(() =>
				this.api.getUsersPage().pipe(
					map((page) => UsersActions.loadUsersPageSuccess({ page })),
					catchError((error) => of(UsersActions.loadUsersPageFailure({ error })))
				)
			),
			debounceTime(200)
		)
	);

	addUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.addUser),
			mergeMap((action) =>
				this.api.addUser(action.user).pipe(
					map((updatedUser) =>
						UsersActions.addUserSuccess({
							user: updatedUser,
						})
					),
					catchError((error) => of(UsersActions.updateUserFailure({ error })))
				)
			)
		)
	);

	updateUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.updateUser),
			mergeMap((action) =>
				this.api.updateUser(action.userId, action.user).pipe(
					map((updatedUser) =>
						UsersActions.updateUserSuccess({
							userId: action.userId,
							user: updatedUser,
						})
					),
					catchError((error) => of(UsersActions.updateUserFailure({ error })))
				)
			)
		)
	);

	deleteUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.deleteUser),
			switchMap((action) =>
				this.api.deleteUser(action.userId).pipe(
					map(() => UsersActions.deleteUserSuccess({ userId: action.userId })),
					catchError((error) => of(UsersActions.deleteUserFailure({ error })))
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private api: UsersApiService
	) {}
}
