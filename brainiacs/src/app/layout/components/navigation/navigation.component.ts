import { Component } from '@angular/core';
import { I18nService } from 'src/app/core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(
    private i18nService: I18nService,
    public translate: TranslateService
  ) {
    translate.use(translate.defaultLang);
  }

  changeLocale(locale: string) {
    this.i18nService.changeLocale(locale);
  }
}
