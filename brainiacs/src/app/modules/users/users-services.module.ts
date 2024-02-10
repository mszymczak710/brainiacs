import { NgModule } from '@angular/core';

import * as services from './services';

@NgModule({
  providers: [services.UsersDataService, services.UsersFacade]
})
export class UsersServicesModule {}
