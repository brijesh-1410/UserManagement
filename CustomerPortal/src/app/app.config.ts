import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CustomerRepositoryPort } from './core/repositories/customer-repository.port';
import { LocalStorageCustomerRepository } from './core/repositories/local-storage-customer.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: CustomerRepositoryPort, useClass: LocalStorageCustomerRepository }
  ]
};
