import * as actions from 'src/app/modules/users/state/actions/users.actions';

import { createFeatureSelector, createReducer, on } from '@ngrx/store';

import { UsersPage } from 'src/app/modules/users/types';

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
  on(actions.loadUsersPageSuccess, (state, action): UsersState => {
    return {
      ...state,
      page: action.page,
      loading: false,
    };
  }),
  on(actions.loadUsersPage, (state): UsersState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(actions.addUserSuccess, (state, { data }): UsersState => {
    const maxId = Math.max(...state.page.result.map((user) => user.id));
    const updatedUser = { ...data, id: maxId + 1 };
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
  on(actions.addUser, (state): UsersState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(actions.deleteUserSuccess, (state, { id }): UsersState => {
    const filteredResult = state.page.result.filter((user) => user.id !== id);
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
  on(actions.deleteUser, (state): UsersState => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(actions.updateUserSuccess, (state, { id, data }): UsersState => {
    const updatedResult = state.page.result.map((existingUser) => {
      if (existingUser.id === id) {
        return { ...existingUser, ...data };
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
  on(actions.updateUser, (state): UsersState => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  })
);
