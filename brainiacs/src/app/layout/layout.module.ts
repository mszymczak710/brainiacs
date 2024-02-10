import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as components from './components';
import * as pages from './pages';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from '../app-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/shared/', '.json');
}

@NgModule({
  declarations: [
    components.HomeComponent,
    components.NavigationComponent,
    pages.LayoutComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CoreModule,
    NgbDropdownModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true
    })
  ],
  exports: [pages.LayoutComponent]
})
export class LayoutModule {}
