import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { Customer } from '../../../core/models/customer.model';
import { CustomerRepositoryPort } from '../../../core/repositories/customer-repository.port';
import { LocalStorageCustomerRepository } from '../../../core/repositories/local-storage-customer.repository';
import { CustomerFacade } from '../../../core/services/customer.facade';
import { CustomerFormComponent } from '../components/customer-form.component';
import { CustomerListComponent } from '../components/customer-list.component';

@Component({
  selector: 'cp-customers-page',
  imports: [NgIf, CustomerFormComponent, CustomerListComponent],
  providers: [{ provide: CustomerRepositoryPort, useClass: LocalStorageCustomerRepository }],
  templateUrl: './customers-page.component.html',
  styleUrl: './customers-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersPageComponent implements OnInit {
  protected readonly facade = inject(CustomerFacade);
  protected readonly selectedCustomer = signal<Customer | null>(null);

  ngOnInit(): void {
    void this.facade.load();
  }

  startEdit(customer: Customer): void {
    this.selectedCustomer.set(customer);
  }

  stopEdit(): void {
    this.selectedCustomer.set(null);
  }

  async removeCustomer(id: string): Promise<void> {
    await this.facade.remove(id);

    if (this.selectedCustomer()?.id === id) {
      this.stopEdit();
    }
  }
}
