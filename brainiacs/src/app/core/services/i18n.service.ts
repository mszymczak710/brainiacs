import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class I18nService {
  localeEvent = new Subject<string>();

  constructor(private translateService: TranslateService) {}

  changeLocale(locale: string) {
    this.translateService.use(locale);
    this.localeEvent.next(locale);
  }
}
