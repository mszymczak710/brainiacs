import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UsersFacade } from '@users/facades';
import { User } from '@users/models';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-add-new-user-dialog',
	templateUrl: './add-new-user-dialog.component.html',
	styleUrls: ['./add-new-user-dialog.component.scss'],
})
export class AddNewUserDialogComponent {
	public createUserForm: FormGroup;
	private currentCount: number;

	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private usersFacade: UsersFacade,
		private toastr: ToastrService
	) {
		this.createUserForm = this.createForm();
		this.usersFacade.all$.subscribe((usersPage) => {
			this.currentCount = usersPage.count;
		});
	}

	get f() {
		return this.createUserForm.controls;
	}

	onSubmit() {
		if (this.createUserForm.invalid) {
			return;
		}

		const user: User = {
			id: this.currentCount + 1,
			firstName: this.f['firstName'].value,
			lastName: this.f['lastName'].value,
			email: this.f['email'].value,
			avatar:
				'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png',
		};
		this.usersFacade.addUser(user);
		this.translate
			.get('USERS.CREATE_DIALOG.TOAST_MESSAGE.SUCCESS')
			.subscribe((message: string) => {
				this.toastr.success(message);
			});
		this.activeModal.close();
	}

	createForm(): FormGroup {
		return this.formBuilder.group({
			firstName: [
				'',
				[
					Validators.required,
					Validators.pattern('[A-Z][a-z]*'),
					Validators.maxLength(255),
				],
			],
			lastName: [
				'',
				[
					Validators.required,
					Validators.pattern('[A-Z][a-z]*'),
					Validators.maxLength(255),
				],
			],
			email: [
				'',
				[Validators.email, Validators.required, Validators.maxLength(255)],
			],
		});
	}
}
