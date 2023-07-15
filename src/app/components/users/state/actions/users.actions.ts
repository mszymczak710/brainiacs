import { createAction, props } from '@ngrx/store';
import { User, UsersPage } from '@users/models';

const SEARCH = '[Users API] Load Users...';
const SEARCH_SUCCESS = '[Users API] Load Users Success';
const SEARCH_FAIL = '[Users API] Load Users Fail';

export const loadUsersPage = createAction(SEARCH);

export const loadUsersPageSuccess = createAction(
  SEARCH_SUCCESS,
  props<{ page: UsersPage }>()
);

export const loadUsersPageFailure = createAction(
  SEARCH_FAIL,
  props<{ error: string }>()
);

export const addUser = createAction(
  '[Users API] Add User...',
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  '[Users API] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[Users API] Add User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Users API] Delete User...',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[Users API] Delete User Success',
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  '[Users API] Delete User Failure',
  props<{ error: string }>()
);

export const loadUser = createAction(
  '[Users API] Load User...',
  props<{ userId: number }>()
);

export const loadUserSuccess = createAction(
  '[Users API] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[Users API] Load User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[Users API] Update User...',
  props<{ userId: number; user: User }>()
);

export const updateUserSuccess = createAction(
  '[Users API] Update User Success',
  props<{ userId: number; user: User }>()
);

export const updateUserFailure = createAction(
  '[Users API] Update User Failure',
  props<{ error: string }>()
);
