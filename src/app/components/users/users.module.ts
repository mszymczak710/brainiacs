import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import {
	AddNewUserDialogComponent,
	UpdateUserDialogComponent,
	DeleteConfirmationDialogComponent,
} from './dialogs/';
import { UsersApiService } from './services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, STATE_KEY } from './state/reducers/users.reducer';
import { effects } from './state/effects';
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { UsersDetailsComponent } from './components/users-details/users-details.component';

export function homeHttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/users/', '.json');
}

@NgModule({
	declarations: [
		UsersPageComponent,
		AddNewUserDialogComponent,
		UpdateUserDialogComponent,
		DeleteConfirmationDialogComponent,
		UsersDetailsComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgbTooltipModule,
		NgbModalModule,
		ReactiveFormsModule,
		StoreModule.forFeature(STATE_KEY, reducers),
		EffectsModule.forFeature(effects),
		UsersRoutingModule,
		TranslateModule.forChild({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: homeHttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
	],
	providers: [UsersApiService],
})
export class UsersModule {}
