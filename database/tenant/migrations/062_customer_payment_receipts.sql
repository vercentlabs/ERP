create table if not exists finance_customer_receipts (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  receipt_number text not null,
  customer_id uuid not null references master_data_customers(id),
  party_id uuid references master_data_parties(id),
  receipt_date date not null default current_date,
  posting_date date,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'POSTED', 'CANCELLED')),
  payment_method text not null check (payment_method in ('CASH', 'BANK_TRANSFER', 'CHEQUE', 'UPI', 'CARD', 'OTHER')),
  deposit_account_id uuid not null references finance_accounts(id),
  reference_number text,
  reference_date date,
  amount_received numeric(18, 2) not null default 0 check (amount_received >= 0),
  allocated_amount numeric(18, 2) not null default 0 check (allocated_amount >= 0),
  currency text not null default 'INR',
  exchange_rate numeric(18, 6) not null default 1,
  journal_entry_id uuid references finance_journal_entries(id),
  posted_at timestamptz,
  cancelled_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists finance_customer_receipt_allocations (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  receipt_id uuid not null references finance_customer_receipts(id) on delete cascade,
  sales_invoice_id uuid not null references sales_invoices(id),
  invoice_number text not null,
  invoice_total_amount numeric(18, 2) not null default 0,
  invoice_amount_due_before numeric(18, 2) not null default 0,
  allocated_amount numeric(18, 2) not null check (allocated_amount > 0),
  invoice_amount_due_after numeric(18, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists finance_customer_receipts_number_uidx
  on finance_customer_receipts (tenant_id, coalesce(company_id, ''), receipt_number)
  where deleted_at is null;

create index if not exists finance_customer_receipts_number_idx on finance_customer_receipts (receipt_number);
create index if not exists finance_customer_receipts_customer_idx on finance_customer_receipts (customer_id);
create index if not exists finance_customer_receipts_status_idx on finance_customer_receipts (status);
create index if not exists finance_customer_receipts_receipt_date_idx on finance_customer_receipts (receipt_date);
create index if not exists finance_customer_receipts_posting_date_idx on finance_customer_receipts (posting_date);
create index if not exists finance_customer_receipts_deposit_account_idx on finance_customer_receipts (deposit_account_id);
create index if not exists finance_customer_receipts_journal_entry_idx on finance_customer_receipts (journal_entry_id);
create index if not exists finance_customer_receipts_deleted_idx on finance_customer_receipts (deleted_at);
create index if not exists finance_customer_receipt_allocations_invoice_idx on finance_customer_receipt_allocations (sales_invoice_id);
create index if not exists finance_customer_receipt_allocations_receipt_idx on finance_customer_receipt_allocations (receipt_id);
