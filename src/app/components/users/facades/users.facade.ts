import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersPage } from '@users/models';
import { UsersActions } from '@users/state';
import { UsersState } from '@users/state/reducers/users.reducer';
import {
	getLoadingState,
	getUsersPage,
} from '@users/state/selectors/users.selector';
import { User } from '@users/models/users.model';

@Injectable({
	providedIn: 'root',
})
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

	addUser(user: User): void {
		this.store.dispatch(UsersActions.addUser({ user }));
	}

	deleteUser(userId: number): void {
		this.store.dispatch(UsersActions.deleteUser({ userId }));
	}

	updateUser(userId: number, user: User): void {
		this.store.dispatch(UsersActions.updateUser({ userId, user }));
	}
}
