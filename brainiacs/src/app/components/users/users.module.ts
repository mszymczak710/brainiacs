import {
	CreateUpdateUserDialogComponent,
	DeleteConfirmationDialogComponent,
} from './dialogs/';
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
import { UsersApiService } from './services';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersRoutingModule } from './users-routing.module';
import { effects } from './state/effects';

export function homeHttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/users/', '.json');
}

@NgModule({
	declarations: [
		CreateUpdateUserDialogComponent,
		DeleteConfirmationDialogComponent,
		UsersDetailsComponent,
		UsersPageComponent,
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
	],
	providers: [UsersApiService],
})
export class UsersModule {}
