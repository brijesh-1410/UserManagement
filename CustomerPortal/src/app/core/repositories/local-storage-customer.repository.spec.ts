import { LocalStorageCustomerRepository } from './local-storage-customer.repository';

describe('LocalStorageCustomerRepository', () => {
  const repository = new LocalStorageCustomerRepository();

  beforeEach(() => {
    localStorage.clear();
  });

  it('creates and lists customers', async () => {
    await repository.create({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      phone: '+1 111 222 3333',
      company: 'Doe Inc.'
    });

    const customers = await repository.list();

    expect(customers.length).toBe(1);
    expect(customers[0].email).toBe('jane@doe.com');
  });

  it('updates customer', async () => {
    const created = await repository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '+1 111 222 3333',
      company: 'Doe Inc.'
    });

    await repository.update(created.id, {
      name: 'John Doe Jr.',
      email: 'johnjr@doe.com',
      phone: '+1 444 555 6666',
      company: 'Doe Labs'
    });

    const customers = await repository.list();
    expect(customers[0].name).toBe('John Doe Jr.');
  });

  it('removes customer', async () => {
    const created = await repository.create({
      name: 'Temp',
      email: 'temp@tmp.com',
      phone: '+1 777 888 9999',
      company: 'TMP'
    });

    await repository.remove(created.id);

    const customers = await repository.list();
    expect(customers.length).toBe(0);
  });
});
