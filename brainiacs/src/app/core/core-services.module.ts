import { NgModule } from '@angular/core';

import * as services from './services';

@NgModule({
  providers: [services.I18nService, services.ToastService]
})
export class CoreServicesModule {}
