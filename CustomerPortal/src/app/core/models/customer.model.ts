export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerDraft {
  name: string;
  email: string;
  phone: string;
  company: string;
}
