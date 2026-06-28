alter table sales_invoices
  add column if not exists debited_amount numeric(14, 2) not null default 0;

alter table finance_accounting_settings
  add column if not exists additional_charges_income_account_id uuid references finance_accounts(id);

create table if not exists sales_debit_notes (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  debit_note_number text not null,
  sales_invoice_id uuid not null references sales_invoices(id),
  customer_id uuid not null references md_customers(id),
  party_id uuid references md_parties(id),
  debit_note_date date not null default current_date,
  posting_date date,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'POSTED', 'CANCELLED')),
  accounting_status text not null default 'NOT_POSTED' check (accounting_status in ('NOT_POSTED', 'POSTED')),
  journal_entry_id uuid references finance_journal_entries(id),
  subtotal_amount numeric(18, 2) not null default 0,
  taxable_amount numeric(18, 2) not null default 0,
  tax_amount numeric(18, 2) not null default 0,
  total_amount numeric(18, 2) not null default 0,
  reason text,
  notes text,
  posted_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists sales_debit_note_lines (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  debit_note_id uuid not null references sales_debit_notes(id) on delete cascade,
  invoice_line_id uuid references sales_invoice_lines(id),
  line_number integer not null,
  item_id uuid references md_items(id),
  description text,
  quantity numeric(18, 6) not null check (quantity > 0),
  uom_id uuid references md_uoms(id),
  unit_amount numeric(18, 6) not null check (unit_amount >= 0),
  taxable_amount numeric(18, 2) not null default 0,
  tax_rate numeric(8, 4) not null default 0,
  tax_amount numeric(18, 2) not null default 0,
  line_total numeric(18, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists sales_debit_notes_number_uidx
  on sales_debit_notes (tenant_id, coalesce(company_id, ''), debit_note_number)
  where deleted_at is null;

create index if not exists sales_invoices_debited_amount_idx on sales_invoices (tenant_id, debited_amount);
create index if not exists finance_accounting_settings_additional_charges_idx on finance_accounting_settings (additional_charges_income_account_id);
create index if not exists sales_debit_notes_number_idx on sales_debit_notes (tenant_id, debit_note_number);
create index if not exists sales_debit_notes_invoice_idx on sales_debit_notes (tenant_id, sales_invoice_id);
create index if not exists sales_debit_notes_customer_idx on sales_debit_notes (tenant_id, customer_id);
create index if not exists sales_debit_notes_status_idx on sales_debit_notes (tenant_id, status);
create index if not exists sales_debit_notes_accounting_status_idx on sales_debit_notes (tenant_id, accounting_status);
create index if not exists sales_debit_notes_date_idx on sales_debit_notes (tenant_id, debit_note_date);
create index if not exists sales_debit_notes_journal_idx on sales_debit_notes (tenant_id, journal_entry_id);
create index if not exists sales_debit_notes_deleted_idx on sales_debit_notes (tenant_id, deleted_at);
create index if not exists sales_debit_note_lines_note_idx on sales_debit_note_lines (tenant_id, debit_note_id);
create index if not exists sales_debit_note_lines_invoice_line_idx on sales_debit_note_lines (tenant_id, invoice_line_id);
create index if not exists sales_debit_note_lines_item_idx on sales_debit_note_lines (tenant_id, item_id);
