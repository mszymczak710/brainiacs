import * as actions from '@users/state/actions/users.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, mergeMap, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { UsersDataService } from '@users/services';

@Injectable()
export class UsersEffects {
  loadUsersPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadUsersPage),
      switchMap(() =>
        this.api.getUsersPage().pipe(
          map((page) => actions.loadUsersPageSuccess({ page })),
          catchError((error) => of(actions.loadUsersPageFailure({ error })))
        )
      ),
      debounceTime(200)
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addUser),
      mergeMap((action) =>
        this.api.addUser(action.data).pipe(
          map((updatedUser) =>
            actions.addUserSuccess({
              data: updatedUser,
            })
          ),
          catchError((error) => of(actions.updateUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateUser),
      mergeMap((action) =>
        this.api.updateUser(action.id, action.data).pipe(
          map((updatedUser) =>
            actions.updateUserSuccess({
              id: action.id,
              data: updatedUser,
            })
          ),
          catchError((error) => of(actions.updateUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteUser),
      switchMap((action) =>
        this.api.deleteUser(action.id).pipe(
          map(() => actions.deleteUserSuccess({ id: action.id })),
          catchError((error) => of(actions.deleteUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: UsersDataService) {}
}
