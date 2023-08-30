import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/users',
		pathMatch: 'full',
	},
	{
		path: 'users',
		loadChildren: () =>
			import('./components/users/users.module').then((m) => m.UsersModule),
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
