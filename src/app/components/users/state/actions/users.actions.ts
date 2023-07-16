import { createAction, props } from '@ngrx/store';
import { User, UsersPage } from '@users/models';

const LOAD_USERS = '[Users API] Load Users...';
const LOAD_USERS_SUCCESS = '[Users API] Load Users Successfully';
const LOAD_USERS_FAIL = '[Users API] Load Users Failure';

const ADD_USER = '[Users API] Add User...';
const ADD_USER_SUCCESS = '[Users API] Add User Successfully';
const ADD_USER_FAIL = '[Users API] Add User Failure';

const UPDATE_USER = '[Users API] Update User...';
const UPDATE_USER_SUCCESS = '[Users API] Update User Successfully';
const UPDATE_USER_FAIL = '[Users API] Update User Failure';

const DELETE_USER = '[Users API] Delete User...';
const DELETE_USER_SUCCESS = '[Users API] Delete User Successfully';
const DELETE_USER_FAIL = '[Users API] Delete User Failure';

export const loadUsersPage = createAction(LOAD_USERS);

export const loadUsersPageSuccess = createAction(LOAD_USERS_SUCCESS, props<{ page: UsersPage }>());

export const loadUsersPageFailure = createAction(LOAD_USERS_FAIL, props<{ error: string }>());

export const addUser = createAction(ADD_USER, props<{ user: User }>());

export const addUserSuccess = createAction(ADD_USER_SUCCESS, props<{ user: User }>());

export const addUserFailure = createAction(ADD_USER_FAIL, props<{ error: string }>());

export const updateUser = createAction(UPDATE_USER, props<{ userId: number; user: User }>());

export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, props<{ userId: number; user: User }>());

export const updateUserFailure = createAction(UPDATE_USER_FAIL, props<{ error: string }>());

export const deleteUser = createAction(DELETE_USER, props<{ userId: number }>());

export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS, props<{ userId: number }>());

export const deleteUserFailure = createAction(DELETE_USER_FAIL, props<{ error: string }>());
