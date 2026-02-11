import { Customer, CustomerDraft } from '../models/customer.model';

export abstract class CustomerRepositoryPort {
  abstract list(): Promise<Customer[]>;
  abstract create(draft: CustomerDraft): Promise<Customer>;
  abstract update(id: string, draft: CustomerDraft): Promise<Customer>;
  abstract remove(id: string): Promise<void>;
}
