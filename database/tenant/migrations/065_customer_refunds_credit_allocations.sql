alter table sales_credit_notes
  add column if not exists allocated_amount numeric(18, 2) not null default 0,
  add column if not exists refunded_amount numeric(18, 2) not null default 0;

alter table sales_debit_notes
  add column if not exists settled_amount numeric(18, 2) not null default 0,
  add column if not exists amount_due numeric(18, 2);

update sales_debit_notes
set amount_due = total_amount
where amount_due is null;

alter table sales_debit_notes
  alter column amount_due set default 0,
  alter column amount_due set not null;

create table if not exists sales_credit_note_allocations (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  credit_note_id uuid not null references sales_credit_notes(id),
  target_type text not null check (target_type in ('SALES_INVOICE', 'SALES_DEBIT_NOTE')),
  target_id uuid not null,
  customer_id uuid not null references md_customers(id),
  allocation_date date not null default current_date,
  amount numeric(18, 2) not null check (amount > 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists finance_customer_refunds (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  refund_number text not null,
  customer_id uuid not null references md_customers(id),
  party_id uuid references md_parties(id),
  refund_date date not null default current_date,
  posting_date date,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'POSTED', 'CANCELLED')),
  payment_method text not null check (payment_method in ('CASH', 'BANK_TRANSFER', 'CHEQUE', 'UPI', 'CARD', 'OTHER')),
  deposit_account_id uuid not null references finance_accounts(id),
  total_amount numeric(18, 2) not null check (total_amount > 0),
  reference_number text,
  notes text,
  journal_entry_id uuid references finance_journal_entries(id),
  posted_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists finance_customer_refund_allocations (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  refund_id uuid not null references finance_customer_refunds(id) on delete cascade,
  credit_note_id uuid not null references sales_credit_notes(id),
  amount numeric(18, 2) not null check (amount > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sales_credit_notes_allocated_amount_idx on sales_credit_notes (tenant_id, allocated_amount);
create index if not exists sales_credit_notes_refunded_amount_idx on sales_credit_notes (tenant_id, refunded_amount);
create index if not exists sales_debit_notes_settled_amount_idx on sales_debit_notes (tenant_id, settled_amount);
create index if not exists sales_debit_notes_amount_due_idx on sales_debit_notes (tenant_id, amount_due);

create index if not exists sales_credit_note_allocations_credit_note_idx on sales_credit_note_allocations (tenant_id, credit_note_id);
create index if not exists sales_credit_note_allocations_target_idx on sales_credit_note_allocations (tenant_id, target_type, target_id);
create index if not exists sales_credit_note_allocations_customer_idx on sales_credit_note_allocations (tenant_id, customer_id);
create index if not exists sales_credit_note_allocations_date_idx on sales_credit_note_allocations (tenant_id, allocation_date);

create unique index if not exists finance_customer_refunds_number_uidx
  on finance_customer_refunds (tenant_id, coalesce(company_id, ''), refund_number)
  where deleted_at is null;

create index if not exists finance_customer_refunds_customer_idx on finance_customer_refunds (tenant_id, customer_id);
create index if not exists finance_customer_refunds_status_idx on finance_customer_refunds (tenant_id, status);
create index if not exists finance_customer_refunds_refund_date_idx on finance_customer_refunds (tenant_id, refund_date);
create index if not exists finance_customer_refunds_journal_idx on finance_customer_refunds (tenant_id, journal_entry_id);
create index if not exists finance_customer_refunds_deleted_idx on finance_customer_refunds (tenant_id, deleted_at);
create index if not exists finance_customer_refund_allocations_refund_idx on finance_customer_refund_allocations (tenant_id, refund_id);
create index if not exists finance_customer_refund_allocations_credit_note_idx on finance_customer_refund_allocations (tenant_id, credit_note_id);
