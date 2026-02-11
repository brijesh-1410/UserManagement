import { Injectable, inject } from '@angular/core';
import { Customer, CustomerDraft } from '../models/customer.model';
import { CustomerRepositoryPort } from '../repositories/customer-repository.port';

@Injectable({ providedIn: 'root' })
export class UpdateCustomerUseCase {
  private readonly repository = inject(CustomerRepositoryPort);

  execute(id: string, draft: CustomerDraft): Promise<Customer> {
    return this.repository.update(id, draft);
  }
}
