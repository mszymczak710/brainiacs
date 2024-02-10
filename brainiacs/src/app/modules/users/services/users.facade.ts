import {
  getLoadingState,
  getUsersPage,
} from 'src/app/modules/users/state/selectors/users.selector';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/modules/users/types';
import { UsersActions } from 'src/app/modules/users/state';
import { UsersPage } from 'src/app/modules/users/types';
import { UsersState } from 'src/app/modules/users/state/reducers/users.reducer';

@Injectable()
export class UsersFacade {
  constructor(private store: Store<UsersState>) {}

  get loading$(): Observable<boolean> {
    return this.store.select(getLoadingState);
  }

  get all$(): Observable<UsersPage> {
    return this.store.select(getUsersPage);
  }

  loadUsersPage(): void {
    this.store.dispatch(UsersActions.loadUsersPage());
  }

  addUser(data: User): void {
    this.store.dispatch(UsersActions.addUser({ data }));
  }

  deleteUser(id: number): void {
    this.store.dispatch(UsersActions.deleteUser({ id }));
  }

  updateUser(id: number, data: User): void {
    this.store.dispatch(UsersActions.updateUser({ id, data }));
  }
}
