import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@users/models';

@Component({
	selector: '[users-details]',
	templateUrl: './users-details.component.html',
	styleUrls: ['./users-details.component.scss'],
})
export class UsersDetailsComponent {
	@Input() user: User;
	@Output() update: EventEmitter<void> = new EventEmitter<void>();
	@Output() delete: EventEmitter<void> = new EventEmitter<void>();
}
