import { Injectable, inject } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerRepositoryPort } from '../repositories/customer-repository.port';

@Injectable({ providedIn: 'root' })
export class ListCustomersUseCase {
  private readonly repository = inject(CustomerRepositoryPort);

  execute(): Promise<Customer[]> {
    return this.repository.list();
  }
}
