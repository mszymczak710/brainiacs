import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UsersFacade } from '@users/facades';

@Component({
	selector: 'app-delete-confirmation-dialog',
	templateUrl: './delete-confirmation-dialog.component.html',
	styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent {
	@Input() userId: number;

	constructor(
		public activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private translate: TranslateService,
		private usersFacade: UsersFacade
	) {}

	cancel(): void {
		this.activeModal.dismiss();
	}

	deleteUser(): void {
		this.usersFacade.deleteUser(this.userId);
		this.translate
			.get('USERS.DIALOG.TOAST_MESSAGE.DELETE.SUCCESS')
			.subscribe((message: string) => {
				this.toastr.error(message);
			});

		this.activeModal.close();
	}
}
