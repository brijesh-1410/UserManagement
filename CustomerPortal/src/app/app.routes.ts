import { Routes } from '@angular/router';
import { CustomersPageComponent } from './features/customers/pages/customers-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomersPageComponent },
  { path: '**', redirectTo: 'customers' }
];
