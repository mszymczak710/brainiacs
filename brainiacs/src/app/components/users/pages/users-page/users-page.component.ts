import { Component, OnInit } from '@angular/core';
import {
	CreateUpdateUserDialogComponent,
	DeleteConfirmationDialogComponent,
} from '@users/dialogs/';
import { Observable, map } from 'rxjs';
import { User, UsersPage } from '@users/models';

import { I18nService } from '@services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UsersFacade } from '@users/facades';

@Component({
	selector: 'app-users',
	templateUrl: './users-page.component.html',
	styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
	usersPage$: Observable<UsersPage> = this.usersFacade.all$;
	users$: Observable<User[]> = this.usersPage$.pipe(
		map((usersPage) => usersPage?.result)
	);

	private user: User;

	constructor(
		private i18nService: I18nService,
		private modalService: NgbModal,
		private translate: TranslateService,
		private usersFacade: UsersFacade
	) {}

	ngOnInit(): void {
		this.i18nService.localeEvent.subscribe((locale) =>
			this.translate.use(locale)
		);
		this.loadUsersPage();
	}

	loadUsersPage(): void {
		this.usersFacade.loadUsersPage();
	}

	addUser(): void {
		const modalRef = this.modalService.open(CreateUpdateUserDialogComponent, {
			size: 'md',
			backdrop: 'static',
		});
		modalRef.componentInstance.dialogType = 'CREATE';
	}

	updateUser(user: User): void {
		this.user = user;
		const modalRef = this.modalService.open(CreateUpdateUserDialogComponent, {
			size: 'md',
			backdrop: 'static',
		});
		modalRef.componentInstance.dialogType = 'UPDATE';
		modalRef.componentInstance.userId = this.user.id;
	}

	deleteUser(user: User): void {
		this.user = user;
		const modalRef = this.modalService.open(DeleteConfirmationDialogComponent, {
			size: 'md',
			backdrop: 'static',
		});
		modalRef.componentInstance.userId = this.user.id;
	}
}
