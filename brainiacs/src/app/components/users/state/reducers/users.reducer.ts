import * as UsersActions from '@users/state/actions/users.actions';

import { createFeatureSelector, createReducer, on } from '@ngrx/store';

import { UsersPage } from '@users/models';

export const STATE_KEY = 'users';

export interface UsersState {
	page: UsersPage;
	error: string;
	loading: boolean;
}

export const initialState: UsersState = {
	page: null,
	error: '',
	loading: true,
};

export interface State {
	users: UsersState;
}

export const getUsersFeatureState =
	createFeatureSelector<UsersState>(STATE_KEY);

export const reducers = createReducer(
	initialState,
	on(UsersActions.loadUsersPageSuccess, (state, action): UsersState => {
		return {
			...state,
			page: action.page,
			loading: false,
		};
	}),
	on(UsersActions.loadUsersPage, (state): UsersState => {
		return {
			...state,
			loading: true,
		};
	}),
	on(UsersActions.addUserSuccess, (state, { user }): UsersState => {
		const maxId = Math.max(...state.page.result.map((user) => user.id));
		const updatedUser = { ...user, id: maxId + 1 };
		const updatedResult = [...state.page.result, updatedUser];
		const totalPages = Math.ceil(updatedResult.length / state.page.pageSize);

		return {
			...state,
			page: {
				...state.page,
				result: updatedResult,
				count: state.page.count + 1,
				totalPages: totalPages,
			},
			loading: false,
			error: '',
		};
	}),
	on(UsersActions.addUser, (state): UsersState => {
		return {
			...state,
			loading: true,
		};
	}),
	on(UsersActions.deleteUserSuccess, (state, { userId }): UsersState => {
		const filteredResult = state.page.result.filter(
			(user) => user.id !== userId
		);
		const totalPages = Math.ceil(filteredResult.length / state.page.pageSize); // Oblicz nową wartość totalPages

		return {
			...state,
			page: {
				...state.page,
				result: filteredResult,
				count: state.page.count - 1,
				totalPages: totalPages, // Aktualizuj totalPages
			},
			loading: false,
			error: '',
		};
	}),
	on(UsersActions.deleteUser, (state): UsersState => {
		return {
			...state,
			loading: true,
			error: '',
		};
	}),
	on(UsersActions.updateUserSuccess, (state, { userId, user }): UsersState => {
		const updatedResult = state.page.result.map((existingUser) => {
			if (existingUser.id === userId) {
				return { ...existingUser, ...user };
			}
			return existingUser;
		});

		return {
			...state,
			page: {
				...state.page,
				result: updatedResult,
			},
			loading: false,
			error: '',
		};
	}),
	on(UsersActions.updateUser, (state): UsersState => {
		return {
			...state,
			loading: true,
			error: '',
		};
	})
);
