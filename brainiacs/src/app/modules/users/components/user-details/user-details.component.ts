import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from 'src/app/modules/users/types';

@Component({
  selector: '[user-details]',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input() user: User;
  @Output() update: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
}
