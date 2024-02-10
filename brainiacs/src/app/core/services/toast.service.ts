import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastService {
  constructor(
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  private showMessage(
    type: 'error' | 'info' | 'success' | 'warning',
    key: string
  ): void {
    this.translateService.get(key).subscribe((message: string) => {
      if (type === 'success') {
        this.toastrService.success(message);
      } else if (type === 'error') {
        this.toastrService.error(message);
      } else if (type === 'info') {
        this.toastrService.info(message);
      } else {
        this.toastrService.warning(message);
      }
    });
  }

  showSuccessMessage(key: string): void {
    this.showMessage('success', key);
  }

  showErrorMessage(key: string): void {
    this.showMessage('error', key);
  }

  showInfoMessage(key: string): void {
    this.showMessage('info', key);
  }

  showWarningMessage(key: string): void {
    this.showMessage('warning', key);
  }
}
