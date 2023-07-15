import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(
    public translate: TranslateService,
    private i18nService: I18nService
  ) {
    translate.use(translate.defaultLang);
  }

  changeLocale(locale: string) {
    this.i18nService.changeLocale(locale);
  }
}
