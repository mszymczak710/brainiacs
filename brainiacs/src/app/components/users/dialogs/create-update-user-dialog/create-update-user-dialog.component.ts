import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@users/models/users.model';
import { UsersFacade } from '@users/facades';

@Component({
	selector: 'app-user-dialog',
	templateUrl: './create-update-user-dialog.component.html',
	styleUrls: ['./create-update-user-dialog.component.scss'],
})
export class CreateUpdateUserDialogComponent implements OnDestroy, OnInit {
	@Input() dialogType: 'CREATE' | 'UPDATE';
	@Input() userId?: number;

	private currentCount: number;
	private existingEmails: string[] = [];
	private initialEmail: string;
	private subscription: Subscription = new Subscription();
	public userForm: FormGroup;

	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private toastr: ToastrService,
		private usersFacade: UsersFacade
	) {}

	ngOnInit(): void {
		this.userForm = this.createForm();

		const sub = this.usersFacade.all$.subscribe((usersPage) => {
			this.existingEmails = usersPage.result.map((user) => user.email);

			if (this.dialogType === 'UPDATE' && this.userId) {
				const currentUser = usersPage.result.find(
					(user) => user.id === this.userId
				);
				if (currentUser) {
					this.initialEmail = currentUser.email;
					this.userForm.patchValue({
						firstName: currentUser.firstName,
						lastName: currentUser.lastName,
						email: currentUser.email,
					});
				}
			}

			if (this.dialogType === 'CREATE') {
				this.currentCount = usersPage.count;
			}
		});
		this.subscription.add(sub);
	}

	get f() {
		return this.userForm.controls;
	}

	cancel(): void {
		this.activeModal.dismiss();
	}

	onSubmit(): void {
		if (this.userForm.invalid) {
			return;
		}

		const email = this.f['email'].value;

		if (this.dialogType === 'UPDATE') {
			if (this.existingEmails.includes(email) && email !== this.initialEmail) {
				this.showTranslatedToast(
					'USERS.DIALOG.TOAST_MESSAGE.CREATE.ERROR',
					'error'
				);
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
			this.showTranslatedToast(
				'USERS.DIALOG.TOAST_MESSAGE.CREATE.SUCCESS',
				'info'
			);
		} else {
			if (this.existingEmails.includes(email)) {
				this.showTranslatedToast(
					'USERS.DIALOG.TOAST_MESSAGE.UPDATE.ERROR',
					'error'
				);
				return;
			}

			const user: User = {
				id: this.currentCount + 1,
				firstName: this.f['firstName'].value,
				lastName: this.f['lastName'].value,
				email: email,
				avatar:
					'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png',
			};

			this.usersFacade.addUser(user);
			this.showTranslatedToast(
				'USERS.DIALOG.TOAST_MESSAGE.UPDATE.SUCCESS',
				'success'
			);
		}

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

	getError(errors: ValidationErrors | null): string[] {
		if (!errors) return [];
		const firstErrorKey = Object.keys(errors)[0];
		return firstErrorKey ? [`${firstErrorKey}`] : [];
	}

	showTranslatedToast(key: string, type: 'success' | 'error' | 'info'): void {
		this.translate.get(key).subscribe((message: string) => {
			if (type === 'success') {
				this.toastr.success(message);
			} else if (type === 'error') {
				this.toastr.error(message);
			} else if (type === 'info') {
				this.toastr.info(message);
			}
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
