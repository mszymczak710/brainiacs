import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { User, UsersPage } from '@users/models';
import * as UsersActions from '@users/state/actions/users.actions';

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
  on(UsersActions.loadUsersPageSuccess, (state, action) => ({
    ...state,
    page: action.page,
    loading: false,
  })),
  on(UsersActions.loadUsersPage, (state): UsersState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(UsersActions.addUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.addUserSuccess, (state, { user }) => {
    const maxId = Math.max(...state.page.result.map((user) => user.id));
    const updatedUser = { ...user, id: maxId + 1 };
    const updatedResult = [...state.page.result, updatedUser];
    const totalPages = Math.ceil(updatedResult.length / state.page.pageSize); // Oblicz nową wartość totalPages

    return {
      ...state,
      page: {
        ...state.page,
        result: updatedResult,
        count: state.page.count + 1,
        totalPages: totalPages, // Aktualizuj totalPages
      },
      loading: false,
      error: null,
    };
  }),
  on(UsersActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.deleteUserSuccess, (state, { userId }) => {
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
      error: null,
    };
  }),
  on(UsersActions.updateUserSuccess, (state, { userId, user }) => {
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
  })
);
