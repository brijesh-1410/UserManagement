import { Injectable, computed, signal } from '@angular/core';
import { Customer, CustomerDraft } from '../models/customer.model';
import { CreateCustomerUseCase } from '../use-cases/create-customer.use-case';
import { DeleteCustomerUseCase } from '../use-cases/delete-customer.use-case';
import { ListCustomersUseCase } from '../use-cases/list-customers.use-case';
import { UpdateCustomerUseCase } from '../use-cases/update-customer.use-case';

@Injectable({ providedIn: 'root' })
export class CustomerFacade {
  private readonly state = signal<Customer[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly customers = computed(() => this.state());
  readonly loading = computed(() => this.loadingState());
  readonly error = computed(() => this.errorState());

  constructor(
    private readonly listCustomers: ListCustomersUseCase,
    private readonly createCustomer: CreateCustomerUseCase,
    private readonly updateCustomer: UpdateCustomerUseCase,
    private readonly deleteCustomer: DeleteCustomerUseCase
  ) {}

  async load(): Promise<void> {
    this.loadingState.set(true);
    this.errorState.set(null);

    try {
      this.state.set(await this.listCustomers.execute());
    } catch (error) {
      this.errorState.set(this.getMessage(error));
    } finally {
      this.loadingState.set(false);
    }
  }

  async create(draft: CustomerDraft): Promise<void> {
    this.errorState.set(null);

    try {
      await this.createCustomer.execute(draft);
      await this.load();
    } catch (error) {
      this.errorState.set(this.getMessage(error));
    }
  }

  async update(id: string, draft: CustomerDraft): Promise<void> {
    this.errorState.set(null);

    try {
      await this.updateCustomer.execute(id, draft);
      await this.load();
    } catch (error) {
      this.errorState.set(this.getMessage(error));
    }
  }

  async remove(id: string): Promise<void> {
    this.errorState.set(null);

    try {
      await this.deleteCustomer.execute(id);
      await this.load();
    } catch (error) {
      this.errorState.set(this.getMessage(error));
    }
  }

  private getMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unexpected error.';
  }
}
