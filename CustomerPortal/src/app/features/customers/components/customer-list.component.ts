import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'cp-customer-list',
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent {
  @Input({ required: true }) customers: Customer[] = [];
  @Output() edit = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<string>();

  trackById(_: number, customer: Customer): string {
    return customer.id;
  }
}
