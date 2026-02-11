# CustomerPortal

Angular standalone application for **Create / Update / Delete / List** customer management.

## Architecture and patterns

- **Feature-first folder structure** for scalability.
- **Repository Pattern** via `CustomerRepositoryPort` with `LocalStorageCustomerRepository` adapter.
- **Use-case classes** (`create`, `update`, `delete`, `list`) to keep business logic isolated.
- **Facade Pattern** (`CustomerFacade`) with Angular signals for reactive and testable state handling.
- **Strict mode** TypeScript + Angular template checks.

## Run locally

```bash
npm install
npm start
```

Then open: `http://localhost:4200/customers`

## Tests

```bash
npm test
```
