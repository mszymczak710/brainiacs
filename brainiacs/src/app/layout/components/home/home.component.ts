import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private i18nService: I18nService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe((locale) =>
      this.translateService.use(locale)
    );
  }
}
