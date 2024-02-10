import { Component, OnInit } from '@angular/core';

import { Observable, map } from 'rxjs';
import { User, UsersPage } from 'src/app/modules/users/types';

import { I18nService } from 'src/app/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UsersFacade } from '@users/services';
import { DeleteConfirmationDialogComponent, UserFormDialog } from '@users/components';

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

  constructor(
    private i18nService: I18nService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.loadUsersPage();
    this.i18nService.localeEvent.subscribe((locale) =>
      this.translateService.use(locale)
    );
  }

  loadUsersPage(): void {
    this.usersFacade.loadUsersPage();
  }

  addUser(): void {
    const modalRef = this.modalService.open(UserFormDialog, {
      size: 'md',
      backdrop: 'static',
    });
  }

  updateUser(user: User): void {
    const modalRef = this.modalService.open(UserFormDialog, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.user = user;
  }

  deleteUser(user: User): void {
    const modalRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.user = user;
  }
}
