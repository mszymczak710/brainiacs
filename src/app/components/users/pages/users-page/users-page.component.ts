import { Component, OnInit } from '@angular/core';
import { UsersFacade } from '@users/facades';
import { User, UsersPage } from '@users/models';
import { Observable, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
	AddNewUserDialogComponent,
	DeleteConfirmationDialogComponent,
	UpdateUserDialogComponent,
} from '@users/dialogs/';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@services';

@Component({
	selector: 'app-users',
	templateUrl: './users-page.component.html',
	styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit {
	usersPage$: Observable<UsersPage> = this.usersFacade.all$;
	users$: Observable<User[]> = this.usersPage$.pipe(map((usersPage) => usersPage?.result));

	user: User;

	constructor(
		private usersFacade: UsersFacade,
		private modalService: NgbModal,
		private translate: TranslateService,
		private i18nService: I18nService
	) {}

	ngOnInit(): void {
		this.i18nService.localeEvent.subscribe((locale) => this.translate.use(locale));
		this.loadUsersPage();
	}

	loadUsersPage(): void {
		this.usersFacade.loadUsersPage();
	}

	addUser(): void {
		const modalRef = this.modalService.open(AddNewUserDialogComponent);
	}

	updateUser(user: User): void {
		this.user = user;
		const modalRef = this.modalService.open(UpdateUserDialogComponent);
		modalRef.componentInstance.userId = this.user.id;
	}

	deleteUser(user: User): void {
		this.user = user;
		const modalRef = this.modalService.open(DeleteConfirmationDialogComponent);
		modalRef.componentInstance.userId = this.user.id;
	}
}
