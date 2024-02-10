import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { STATE_KEY, reducers } from './state/reducers/users.reducer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UsersRoutingModule } from './users-routing.module';
import { effects } from './state/effects';
import { UsersServicesModule } from './users-services.module';

import * as components from './components';
import * as pages from './pages';

export function homeHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/users/', '.json');
}

@NgModule({
  declarations: [
    components.UserFormDialog,
    components.DeleteConfirmationDialogComponent,
    components.UserDetailsComponent,
    pages.UsersPageComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature(effects),
    NgbTooltipModule,
    NgbModalModule,
    ReactiveFormsModule,
    StoreModule.forFeature(STATE_KEY, reducers),
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: homeHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    UsersRoutingModule,
    UsersServicesModule
  ]
})
export class UsersModule {}
