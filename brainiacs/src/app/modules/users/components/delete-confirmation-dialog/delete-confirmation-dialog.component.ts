import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersFacade } from '@users/services';
import { ToastService } from '@services';
import { User } from '@users/types';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
})
export class DeleteConfirmationDialogComponent {
  @Input() user: User;

  constructor(
    public dialog: NgbActiveModal,
    private toastService: ToastService,
    private usersFacade: UsersFacade
  ) {}

  cancel(): void {
    this.dialog.dismiss();
  }

  deleteUser(): void {
    this.usersFacade.deleteUser(this.user.id);
    this.toastService.showErrorMessage(
      'user.dialog.toast_message.delete.success'
    );
    this.dialog.close();
  }
}
