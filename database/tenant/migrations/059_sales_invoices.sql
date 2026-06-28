create table if not exists sales_invoices (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  invoice_number text not null,
  customer_id uuid not null references md_customers(id),
  party_id uuid references md_parties(id),
  sales_order_id uuid references sales_orders(id),
  delivery_note_id uuid references sales_delivery_notes(id),
  opportunity_id uuid references crm_opportunities(id),
  quotation_id uuid references sales_quotations(id),
  invoice_date date not null default current_date,
  due_date date,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'ISSUED', 'CANCELLED')),
  payment_status text not null default 'UNPAID' check (payment_status in ('UNPAID', 'PARTIALLY_PAID', 'PAID')),
  currency text not null default 'INR',
  exchange_rate numeric(18, 6) not null default 1,
  billing_address_id uuid references md_addresses(id),
  shipping_address_id uuid references md_addresses(id),
  place_of_supply text,
  gst_treatment text,
  subtotal_amount numeric(18, 2) not null default 0,
  discount_amount numeric(18, 2) not null default 0,
  taxable_amount numeric(18, 2) not null default 0,
  tax_amount numeric(18, 2) not null default 0,
  total_amount numeric(18, 2) not null default 0,
  rounded_total_amount numeric(18, 2),
  amount_paid numeric(18, 2) not null default 0,
  amount_due numeric(18, 2) not null default 0,
  terms text,
  notes text,
  owner_user_id text,
  assigned_team_id text,
  issued_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists sales_invoice_lines (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  invoice_id uuid not null references sales_invoices(id) on delete cascade,
  sales_order_line_id uuid references sales_order_lines(id),
  delivery_note_line_id uuid references sales_delivery_note_lines(id),
  line_number integer not null,
  item_id uuid not null references md_items(id),
  item_name text not null,
  description text,
  quantity numeric(18, 4) not null check (quantity > 0),
  uom_id uuid not null references md_uoms(id),
  unit_price numeric(18, 2) not null check (unit_price >= 0),
  discount_percent numeric(5, 2) not null default 0 check (discount_percent >= 0 and discount_percent <= 100),
  discount_amount numeric(18, 2) not null default 0,
  taxable_amount numeric(18, 2) not null default 0,
  tax_rate numeric(5, 2) not null default 0 check (tax_rate >= 0),
  tax_amount numeric(18, 2) not null default 0,
  line_subtotal numeric(18, 2) not null default 0,
  line_total numeric(18, 2) not null default 0,
  hsn_sac_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists sales_invoices_tenant_company_number_uidx
  on sales_invoices (tenant_id, coalesce(company_id, ''), invoice_number)
  where deleted_at is null;
create unique index if not exists sales_invoices_delivery_note_uidx
  on sales_invoices (delivery_note_id)
  where delivery_note_id is not null and deleted_at is null;
create unique index if not exists sales_invoices_order_direct_uidx
  on sales_invoices (sales_order_id)
  where sales_order_id is not null and delivery_note_id is null and deleted_at is null;

create unique index if not exists sales_invoice_lines_number_uidx on sales_invoice_lines (invoice_id, line_number);
create index if not exists sales_invoices_number_idx on sales_invoices (tenant_id, invoice_number);
create index if not exists sales_invoices_customer_idx on sales_invoices (tenant_id, customer_id);
create index if not exists sales_invoices_party_idx on sales_invoices (tenant_id, party_id);
create index if not exists sales_invoices_order_idx on sales_invoices (tenant_id, sales_order_id);
create index if not exists sales_invoices_delivery_note_idx on sales_invoices (tenant_id, delivery_note_id);
create index if not exists sales_invoices_opportunity_idx on sales_invoices (tenant_id, opportunity_id);
create index if not exists sales_invoices_quotation_idx on sales_invoices (tenant_id, quotation_id);
create index if not exists sales_invoices_status_idx on sales_invoices (tenant_id, status);
create index if not exists sales_invoices_payment_status_idx on sales_invoices (tenant_id, payment_status);
create index if not exists sales_invoices_invoice_date_idx on sales_invoices (tenant_id, invoice_date);
create index if not exists sales_invoices_due_date_idx on sales_invoices (tenant_id, due_date);
create index if not exists sales_invoices_deleted_at_idx on sales_invoices (tenant_id, deleted_at);
create index if not exists sales_invoice_lines_invoice_idx on sales_invoice_lines (tenant_id, invoice_id);
create index if not exists sales_invoice_lines_item_idx on sales_invoice_lines (tenant_id, item_id);
