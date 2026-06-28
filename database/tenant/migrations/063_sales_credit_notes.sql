alter table sales_invoices
  add column if not exists credited_amount numeric(18, 2) not null default 0;

alter table finance_accounting_settings
  add column if not exists sales_returns_account_id uuid references finance_accounts(id);

create table if not exists sales_credit_notes (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  credit_note_number text not null,
  sales_invoice_id uuid not null references sales_invoices(id),
  customer_id uuid not null references md_customers(id),
  party_id uuid references md_parties(id),
  credit_note_date date not null default current_date,
  posting_date date,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'POSTED', 'CANCELLED')),
  reason text,
  return_to_stock boolean not null default false,
  warehouse_id uuid references inventory_warehouses(id),
  currency text not null default 'INR',
  exchange_rate numeric(18, 6) not null default 1,
  subtotal_amount numeric(18, 2) not null default 0,
  discount_amount numeric(18, 2) not null default 0,
  taxable_amount numeric(18, 2) not null default 0,
  tax_amount numeric(18, 2) not null default 0,
  total_amount numeric(18, 2) not null default 0,
  journal_entry_id uuid references finance_journal_entries(id),
  posted_at timestamptz,
  cancelled_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists sales_credit_note_lines (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  credit_note_id uuid not null references sales_credit_notes(id) on delete cascade,
  sales_invoice_line_id uuid references sales_invoice_lines(id),
  line_number integer not null,
  item_id uuid not null references md_items(id),
  item_name text not null,
  description text,
  quantity numeric(18, 6) not null check (quantity > 0),
  uom_id uuid not null references md_uoms(id),
  unit_price numeric(18, 6) not null check (unit_price >= 0),
  discount_percent numeric(8, 4) not null default 0 check (discount_percent >= 0 and discount_percent <= 100),
  discount_amount numeric(18, 2) not null default 0,
  taxable_amount numeric(18, 2) not null default 0,
  tax_rate numeric(8, 4) not null default 0,
  tax_amount numeric(18, 2) not null default 0,
  line_subtotal numeric(18, 2) not null default 0,
  line_total numeric(18, 2) not null default 0,
  hsn_sac_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists sales_credit_notes_number_uidx
  on sales_credit_notes (tenant_id, coalesce(company_id, ''), credit_note_number)
  where deleted_at is null;

create index if not exists sales_invoices_credited_amount_idx on sales_invoices (tenant_id, credited_amount);
create index if not exists finance_accounting_settings_sales_returns_idx on finance_accounting_settings (sales_returns_account_id);
create index if not exists sales_credit_notes_number_idx on sales_credit_notes (tenant_id, credit_note_number);
create index if not exists sales_credit_notes_invoice_idx on sales_credit_notes (tenant_id, sales_invoice_id);
create index if not exists sales_credit_notes_customer_idx on sales_credit_notes (tenant_id, customer_id);
create index if not exists sales_credit_notes_status_idx on sales_credit_notes (tenant_id, status);
create index if not exists sales_credit_notes_date_idx on sales_credit_notes (tenant_id, credit_note_date);
create index if not exists sales_credit_notes_posting_date_idx on sales_credit_notes (tenant_id, posting_date);
create index if not exists sales_credit_notes_journal_idx on sales_credit_notes (tenant_id, journal_entry_id);
create index if not exists sales_credit_notes_deleted_idx on sales_credit_notes (tenant_id, deleted_at);
create index if not exists sales_credit_note_lines_note_idx on sales_credit_note_lines (tenant_id, credit_note_id);
create index if not exists sales_credit_note_lines_invoice_line_idx on sales_credit_note_lines (tenant_id, sales_invoice_line_id);
create index if not exists sales_credit_note_lines_item_idx on sales_credit_note_lines (tenant_id, item_id);

do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where table_name = 'inventory_stock_ledger_entries'
      and constraint_name = 'inventory_stock_ledger_entries_movement_type_check'
  ) then
    alter table inventory_stock_ledger_entries
      drop constraint inventory_stock_ledger_entries_movement_type_check;
  end if;
end $$;

alter table inventory_stock_ledger_entries
  add constraint inventory_stock_ledger_entries_movement_type_check
  check (movement_type in ('OPENING', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT', 'TRANSFER_IN', 'TRANSFER_OUT', 'SALES_HOLD', 'SALES_RELEASE', 'SALES_ISSUE', 'SALES_RETURN', 'PURCHASE_RECEIPT', 'MANUFACTURING_RECEIPT', 'MANUFACTURING_ISSUE'));
