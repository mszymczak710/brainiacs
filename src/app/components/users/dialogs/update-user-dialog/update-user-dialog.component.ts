import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UsersFacade } from '@users/facades';
import { User } from '@users/models/users.model';
import { UsersApiService } from '@users/services/users-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-update-user-dialog',
	templateUrl: './update-user-dialog.component.html',
	styleUrls: ['./update-user-dialog.component.scss'],
})
export class UpdateUserDialogComponent implements OnInit {
	@Input() userId: number;
	public updateUserForm: FormGroup;
	private existingEmails: string[] = [];

	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private usersApiService: UsersApiService,
		private usersFacade: UsersFacade,
		private translate: TranslateService,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.updateUserForm = this.createForm();

		this.usersFacade.all$.subscribe((usersPage) => {
			this.existingEmails = usersPage.result.map((user) => user.email);
		});

		this.usersApiService.getUser(this.userId).subscribe((user: User) => {
			this.updateUserForm.patchValue({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			});
		});
	}

	get f() {
		return this.updateUserForm.controls;
	}

	onSubmit() {
		if (this.updateUserForm.invalid) {
			return;
		}

		const email = this.f['email'].value;

		if (this.existingEmails.includes(email)) {
			this.translate
				.get('USERS.UPDATE_DIALOG.TOAST_MESSAGE.ERROR')
				.subscribe((message: string) => {
					this.toastr.error(message);
				});

			return;
		}

		const user: User = {
			id: this.userId,
			firstName: this.f['firstName'].value,
			lastName: this.f['lastName'].value,
			email: this.f['email'].value,
			avatar: '',
		};

		this.usersFacade.updateUser(this.userId, user);
		this.translate
			.get('USERS.UPDATE_DIALOG.TOAST_MESSAGE.SUCCESS')
			.subscribe((message: string) => {
				this.toastr.info(message);
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
