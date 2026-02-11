import { Injectable } from '@angular/core';
import { Customer, CustomerDraft } from '../models/customer.model';
import { CustomerRepositoryPort } from './customer-repository.port';

const STORAGE_KEY = 'customer-portal-customers';

@Injectable()
export class LocalStorageCustomerRepository implements CustomerRepositoryPort {
  async list(): Promise<Customer[]> {
    return this.readAll();
  }

  async create(draft: CustomerDraft): Promise<Customer> {
    const customers = this.readAll();
    const now = new Date().toISOString();
    const next: Customer = {
      id: crypto.randomUUID(),
      ...draft,
      createdAt: now,
      updatedAt: now
    };

    customers.unshift(next);
    this.writeAll(customers);
    return next;
  }

  async update(id: string, draft: CustomerDraft): Promise<Customer> {
    const customers = this.readAll();
    const index = customers.findIndex((customer) => customer.id === id);

    if (index < 0) {
      throw new Error('Customer not found.');
    }

    const updated: Customer = {
      ...customers[index],
      ...draft,
      updatedAt: new Date().toISOString()
    };

    customers[index] = updated;
    this.writeAll(customers);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const customers = this.readAll().filter((customer) => customer.id !== id);
    this.writeAll(customers);
  }

  private readAll(): Customer[] {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) {
      return [];
    }

    try {
      return JSON.parse(value) as Customer[];
    } catch {
      return [];
    }
  }

  private writeAll(customers: Customer[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  }
}
