create table if not exists sales_quotations (
  id uuid primary key,
  tenant_id text not null,
  company_id text,
  branch_id text,
  quotation_number text not null,
  customer_id uuid not null references md_customers(id),
  party_id uuid references md_parties(id),
  opportunity_id uuid references crm_opportunities(id),
  quote_date date not null,
  valid_until date not null,
  status text not null default 'DRAFT',
  currency text not null default 'INR',
  exchange_rate numeric(18, 6) not null default 1,
  price_list_id uuid,
  billing_address_id uuid references md_addresses(id),
  shipping_address_id uuid references md_addresses(id),
  subtotal_amount numeric(18, 2) not null default 0,
  discount_amount numeric(18, 2) not null default 0,
  tax_amount numeric(18, 2) not null default 0,
  total_amount numeric(18, 2) not null default 0,
  terms text,
  notes text,
  rejection_reason text,
  owner_user_id text,
  assigned_team_id text,
  accepted_at timestamptz,
  rejected_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint sales_quotations_status_check check (
    status in ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'CANCELLED')
  )
);

create table if not exists sales_quotation_lines (
  id uuid primary key,
  tenant_id text not null,
  quotation_id uuid not null references sales_quotations(id) on delete cascade,
  line_number integer not null,
  item_id uuid not null references md_items(id),
  item_name text not null,
  description text,
  quantity numeric(18, 4) not null,
  uom_id uuid not null references md_uoms(id),
  unit_price numeric(18, 2) not null,
  discount_percent numeric(5, 2) not null default 0,
  discount_amount numeric(18, 2) not null default 0,
  tax_rate numeric(5, 2) not null default 0,
  tax_amount numeric(18, 2) not null default 0,
  line_subtotal numeric(18, 2) not null default 0,
  line_total numeric(18, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sales_quotation_lines_quantity_check check (quantity > 0),
  constraint sales_quotation_lines_unit_price_check check (unit_price >= 0),
  constraint sales_quotation_lines_discount_percent_check check (discount_percent >= 0 and discount_percent <= 100),
  constraint sales_quotation_lines_tax_rate_check check (tax_rate >= 0)
);

create unique index if not exists sales_quotations_tenant_company_number_uidx
  on sales_quotations (tenant_id, coalesce(company_id, ''), quotation_number)
  where deleted_at is null;

create unique index if not exists sales_quotation_lines_number_uidx
  on sales_quotation_lines (quotation_id, line_number);

create index if not exists sales_quotations_number_idx on sales_quotations (tenant_id, quotation_number);
create index if not exists sales_quotations_customer_idx on sales_quotations (tenant_id, customer_id);
create index if not exists sales_quotations_party_idx on sales_quotations (tenant_id, party_id);
create index if not exists sales_quotations_opportunity_idx on sales_quotations (tenant_id, opportunity_id);
create index if not exists sales_quotations_status_idx on sales_quotations (tenant_id, status);
create index if not exists sales_quotations_quote_date_idx on sales_quotations (tenant_id, quote_date);
create index if not exists sales_quotations_valid_until_idx on sales_quotations (tenant_id, valid_until);
create index if not exists sales_quotations_owner_idx on sales_quotations (tenant_id, owner_user_id);
create index if not exists sales_quotations_deleted_at_idx on sales_quotations (tenant_id, deleted_at);
create index if not exists sales_quotation_lines_quotation_idx on sales_quotation_lines (quotation_id);
