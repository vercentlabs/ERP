create table if not exists finance_bank_accounts (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  account_id uuid not null references finance_accounts(id),
  bank_name text,
  account_name text not null,
  account_number_last4 text,
  ifsc_code text,
  branch_name text,
  account_type text not null check (account_type in ('CASH', 'CURRENT', 'SAVINGS', 'OD', 'OTHER')),
  currency text not null default 'INR',
  opening_balance numeric(18, 2) not null default 0,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  is_default boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists finance_bank_reconciliations (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  reconciliation_number text not null,
  bank_account_id uuid not null references finance_bank_accounts(id),
  statement_start_date date not null,
  statement_end_date date not null,
  opening_statement_balance numeric(18, 2) not null default 0,
  closing_statement_balance numeric(18, 2) not null default 0,
  system_opening_balance numeric(18, 2) not null default 0,
  system_closing_balance numeric(18, 2) not null default 0,
  matched_amount numeric(18, 2) not null default 0,
  unmatched_statement_amount numeric(18, 2) not null default 0,
  difference_amount numeric(18, 2) not null default 0,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'COMPLETED', 'CANCELLED')),
  notes text,
  completed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  check (statement_start_date <= statement_end_date)
);

create table if not exists finance_bank_reconciliation_lines (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  reconciliation_id uuid not null references finance_bank_reconciliations(id) on delete cascade,
  transaction_date date not null,
  description text not null,
  reference_number text,
  debit_amount numeric(18, 2) not null default 0 check (debit_amount >= 0),
  credit_amount numeric(18, 2) not null default 0 check (credit_amount >= 0),
  amount numeric(18, 2) not null,
  matched_journal_entry_id uuid references finance_journal_entries(id),
  matched_journal_entry_line_id uuid references finance_journal_entry_lines(id),
  matched_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (amount <> 0),
  check (
    (debit_amount > 0 and credit_amount = 0)
    or (credit_amount > 0 and debit_amount = 0)
  )
);

create unique index if not exists finance_bank_accounts_default_uidx
  on finance_bank_accounts (tenant_id, coalesce(company_id, ''))
  where is_default = true and deleted_at is null and status = 'ACTIVE';
create unique index if not exists finance_bank_reconciliations_number_uidx
  on finance_bank_reconciliations (tenant_id, coalesce(company_id, ''), reconciliation_number)
  where deleted_at is null;
create unique index if not exists finance_bank_reconciliation_matched_line_uidx
  on finance_bank_reconciliation_lines (matched_journal_entry_line_id)
  where matched_journal_entry_line_id is not null;

create index if not exists finance_bank_accounts_account_idx on finance_bank_accounts (tenant_id, account_id);
create index if not exists finance_bank_accounts_status_idx on finance_bank_accounts (tenant_id, status);
create index if not exists finance_bank_accounts_deleted_idx on finance_bank_accounts (tenant_id, deleted_at);
create index if not exists finance_bank_reconciliations_bank_idx on finance_bank_reconciliations (tenant_id, bank_account_id);
create index if not exists finance_bank_reconciliations_status_idx on finance_bank_reconciliations (tenant_id, status);
create index if not exists finance_bank_reconciliations_dates_idx on finance_bank_reconciliations (tenant_id, statement_start_date, statement_end_date);
create index if not exists finance_bank_reconciliations_deleted_idx on finance_bank_reconciliations (tenant_id, deleted_at);
create index if not exists finance_bank_reconciliation_lines_reconciliation_idx on finance_bank_reconciliation_lines (tenant_id, reconciliation_id);
create index if not exists finance_bank_reconciliation_lines_date_idx on finance_bank_reconciliation_lines (tenant_id, transaction_date);
create index if not exists finance_bank_reconciliation_lines_matched_idx on finance_bank_reconciliation_lines (tenant_id, matched_journal_entry_line_id);
