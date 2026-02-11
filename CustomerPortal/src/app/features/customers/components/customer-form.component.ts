import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer, CustomerDraft } from '../../../core/models/customer.model';

@Component({
  selector: 'cp-customer-form',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerFormComponent implements OnChanges {
  @Input() selectedCustomer: Customer | null = null;
  @Input() submitting = false;
  @Output() createCustomer = new EventEmitter<CustomerDraft>();
  @Output() updateCustomer = new EventEmitter<{ id: string; draft: CustomerDraft }>();
  @Output() cancelEdit = new EventEmitter<void>();

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(30)]],
    company: ['', [Validators.required, Validators.maxLength(80)]]
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCustomer']) {
      if (this.selectedCustomer) {
        this.form.patchValue(this.selectedCustomer);
      } else {
        this.form.reset({ name: '', email: '', phone: '', company: '' });
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const draft = this.form.getRawValue();

    if (this.selectedCustomer) {
      this.updateCustomer.emit({ id: this.selectedCustomer.id, draft });
      return;
    }

    this.createCustomer.emit(draft);
  }

  reset(): void {
    this.form.reset({ name: '', email: '', phone: '', company: '' });
    this.cancelEdit.emit();
  }
}
