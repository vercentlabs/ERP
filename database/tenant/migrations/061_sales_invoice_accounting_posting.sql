alter table sales_invoices
  add column if not exists accounting_status text not null default 'NOT_POSTED' check (accounting_status in ('NOT_POSTED', 'POSTED')),
  add column if not exists journal_entry_id uuid references finance_journal_entries(id),
  add column if not exists accounting_posted_at timestamptz;

create table if not exists finance_accounting_settings (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  accounts_receivable_account_id uuid not null references finance_accounts(id),
  sales_income_account_id uuid not null references finance_accounts(id),
  sales_tax_payable_account_id uuid references finance_accounts(id),
  rounding_adjustment_account_id uuid references finance_accounts(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists finance_accounting_settings_scope_uidx
  on finance_accounting_settings (tenant_id, coalesce(company_id, ''), coalesce(branch_id, ''));
create index if not exists sales_invoices_accounting_status_idx on sales_invoices (tenant_id, accounting_status);
create index if not exists sales_invoices_journal_entry_idx on sales_invoices (tenant_id, journal_entry_id);
create index if not exists sales_invoices_accounting_posted_idx on sales_invoices (tenant_id, accounting_posted_at);
