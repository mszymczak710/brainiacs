import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';

@NgModule({
	imports: [RouterModule.forChild([{ path: '', component: UsersPageComponent }])],
	exports: [RouterModule],
})
export class UsersRoutingModule {}
