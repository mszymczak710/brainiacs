import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
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
		private usersFacade: UsersFacade,
		private toastr: ToastrService,
		private translate: TranslateService
	) {}

	deleteUser(): void {
		this.usersFacade.deleteUser(this.userId);
		this.translate
			.get('USERS.DELETE_DIALOG.TOAST_MESSAGE.SUCCESS')
			.subscribe((message: string) => {
				this.toastr.error(message);
			});

		this.activeModal.close();
	}
}
