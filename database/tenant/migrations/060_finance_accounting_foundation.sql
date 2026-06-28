create table if not exists finance_account_groups (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  name text not null,
  code text not null,
  type text not null check (type in ('ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE')),
  parent_group_id uuid references finance_account_groups(id),
  is_system boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists finance_accounts (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  account_code text not null,
  account_name text not null,
  account_type text not null check (account_type in ('ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE')),
  group_id uuid references finance_account_groups(id),
  parent_account_id uuid references finance_accounts(id),
  normal_balance text not null check (normal_balance in ('DEBIT', 'CREDIT')),
  is_control_account boolean not null default false,
  is_cash_account boolean not null default false,
  is_bank_account boolean not null default false,
  is_system boolean not null default false,
  is_active boolean not null default true,
  opening_balance numeric(18, 2) not null default 0,
  opening_balance_type text not null default 'DEBIT' check (opening_balance_type in ('DEBIT', 'CREDIT')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists finance_fiscal_years (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  name text not null,
  start_date date not null,
  end_date date not null,
  status text not null default 'OPEN' check (status in ('OPEN', 'CLOSED')),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  closed_at timestamptz,
  check (start_date <= end_date)
);

create table if not exists finance_journal_entries (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  journal_number text not null,
  journal_date date not null default current_date,
  posting_date date,
  fiscal_year_id uuid not null references finance_fiscal_years(id),
  reference_type text,
  reference_id uuid,
  source_module text,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'POSTED', 'CANCELLED')),
  narration text,
  total_debit numeric(18, 2) not null default 0,
  total_credit numeric(18, 2) not null default 0,
  posted_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists finance_journal_entry_lines (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  journal_entry_id uuid not null references finance_journal_entries(id) on delete cascade,
  line_number integer not null,
  account_id uuid not null references finance_accounts(id),
  party_id uuid references md_parties(id),
  customer_id uuid references md_customers(id),
  supplier_id uuid references md_suppliers(id),
  debit_amount numeric(18, 2) not null default 0 check (debit_amount >= 0),
  credit_amount numeric(18, 2) not null default 0 check (credit_amount >= 0),
  narration text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (debit_amount > 0 and credit_amount = 0)
    or (credit_amount > 0 and debit_amount = 0)
  )
);

create unique index if not exists finance_account_groups_scope_code_uidx
  on finance_account_groups (tenant_id, coalesce(company_id, ''), code)
  where deleted_at is null;
create unique index if not exists finance_accounts_scope_code_uidx
  on finance_accounts (tenant_id, coalesce(company_id, ''), account_code)
  where deleted_at is null;
create unique index if not exists finance_fiscal_years_default_uidx
  on finance_fiscal_years (tenant_id, coalesce(company_id, ''))
  where is_default = true;
create unique index if not exists finance_journal_entries_scope_number_uidx
  on finance_journal_entries (tenant_id, coalesce(company_id, ''), journal_number)
  where deleted_at is null;
create unique index if not exists finance_journal_entry_lines_number_uidx
  on finance_journal_entry_lines (journal_entry_id, line_number);

create index if not exists finance_account_groups_type_idx on finance_account_groups (tenant_id, type);
create index if not exists finance_account_groups_deleted_idx on finance_account_groups (tenant_id, deleted_at);
create index if not exists finance_accounts_type_idx on finance_accounts (tenant_id, account_type);
create index if not exists finance_accounts_group_idx on finance_accounts (tenant_id, group_id);
create index if not exists finance_accounts_active_idx on finance_accounts (tenant_id, is_active);
create index if not exists finance_accounts_deleted_idx on finance_accounts (tenant_id, deleted_at);
create index if not exists finance_fiscal_years_status_idx on finance_fiscal_years (tenant_id, status);
create index if not exists finance_journal_entries_status_idx on finance_journal_entries (tenant_id, status);
create index if not exists finance_journal_entries_fiscal_year_idx on finance_journal_entries (tenant_id, fiscal_year_id);
create index if not exists finance_journal_entries_date_idx on finance_journal_entries (tenant_id, journal_date);
create index if not exists finance_journal_entries_posting_date_idx on finance_journal_entries (tenant_id, posting_date);
create index if not exists finance_journal_entries_deleted_idx on finance_journal_entries (tenant_id, deleted_at);
create index if not exists finance_journal_entry_lines_entry_idx on finance_journal_entry_lines (tenant_id, journal_entry_id);
create index if not exists finance_journal_entry_lines_account_idx on finance_journal_entry_lines (tenant_id, account_id);
