import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'users-table-pagination',
  templateUrl: './users-table-pagination.component.html',
  styleUrls: ['./users-table-pagination.component.scss'],
})
export class UsersTablePaginationComponent {
  @Input() totalItems: number;
  @Input() currentPage: number;
  @Input() pageSize: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }
}
