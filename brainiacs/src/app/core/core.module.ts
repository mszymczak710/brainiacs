import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreServicesModule } from './core-services.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreServicesModule,
    TranslateModule
  ]
})
export class CoreModule {}
