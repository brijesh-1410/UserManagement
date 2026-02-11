import { Injectable, inject } from '@angular/core';
import { CustomerRepositoryPort } from '../repositories/customer-repository.port';

@Injectable({ providedIn: 'root' })
export class DeleteCustomerUseCase {
  private readonly repository = inject(CustomerRepositoryPort);

  execute(id: string): Promise<void> {
    return this.repository.remove(id);
  }
}
