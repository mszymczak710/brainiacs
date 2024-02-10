import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@users/types';
import { UsersFacade } from '@users/services';
import { FormField } from '@users/types';
import { ToastService } from '@services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-form-dialog.component.html',
})
export class UserFormDialog implements OnInit {
  @Input() user: User;

  private currentCount: number;
  private existingEmails: string[] = [];
  private initialEmail: string;

  form: FormGroup;
  formFields: FormField[] = [];

  get title() {
    const isUpdate = !!this.user;
    return isUpdate
      ? this.translateService.instant('users.dialog.update.title')
      : this.translateService.instant('users.dialog.create.title');
  }

  get f() {
    return this.form.controls;
  }

  constructor(
    public dialog: NgbActiveModal,
    private toastService: ToastService,
    private translateService: TranslateService,
    private usersFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.prepareFields();

    this.usersFacade.all$.subscribe((usersPage) => {
      this.existingEmails = usersPage.result.map((user) => user.email);

      if (this.user) {
        const currentUser = usersPage.result.find(
          (user) => user.id === this.user.id
        );
        if (currentUser) {
          this.initialEmail = currentUser.email;
          this.form.patchValue({
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
          });
        }
      }

      this.currentCount = usersPage.count;
    });
  }

  private setFieldsValues(user: User): void {
    this.initialEmail = user.email;
    this.form.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }

  cancel(): void {
    this.dialog.dismiss();
  }

  prepareFields(): void {
    this.formFields.push(
      {
        label: 'users.dialog.first_name',
        type: 'text',
        fieldName: 'first_name',
        placeholder: 'users.dialog.first_name.placeholder',
        required: true,
        class: 'form-group mb-3 col-6',
      },
      {
        label: 'users.dialog.last_name',
        type: 'text',
        fieldName: 'last_name',
        placeholder: 'users.dialog.last_name.placeholder',
        required: true,
        class: 'form-group mb-3 col-6',
      },
      {
        label: 'users.dialog.email',
        type: 'email',
        fieldName: 'email',
        placeholder: 'users.dialog.email.placeholder',
        required: true,
        class: 'form-group mb-3 col-12',
      }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const email = this.f['email'].value;
    const isUpdate = !!this.user;
    const isEmailTaken =
      this.existingEmails.includes(email) && email !== this.initialEmail;

    if (isUpdate && isEmailTaken) {
      this.toastService.showErrorMessage(
        'users.dialog.toast_message.update.error'
      );
      return;
    }

    if (!isUpdate && this.existingEmails.includes(email)) {
      this.toastService.showErrorMessage(
        'users.dialog.toast_message.create.error'
      );
      return;
    }

    const userData: User = {
      ...this.form.value,
      id: isUpdate ? this.user.id : this.currentCount + 1,
      first_name: this.f['first_name'].value,
      last_name: this.f['last_name'].value,
      email: email,
      avatar: isUpdate
        ? this.user.avatar
        : 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png',
    };

    if (isUpdate) {
      this.usersFacade.updateUser(this.user.id, userData);
      this.toastService.showSuccessMessage(
        'users.dialog.toast_message.update.success'
      );
    } else {
      this.usersFacade.addUser(userData);
      this.toastService.showSuccessMessage(
        'users.dialog.toast_message.create.success'
      );
    }

    this.dialog.close();
  }

  createForm(): void {
    this.form = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Z][a-z]*'),
        Validators.maxLength(255),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Z][a-z]*'),
        Validators.maxLength(255),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255),
      ]),
    });
  }

  getError(controlName: string): string[] {
    const control = this.f[controlName];
    if (!control.errors) return [];
    const firstErrorKey = Object.keys(control.errors)[0];
    return [`${firstErrorKey}`];
  }
}
