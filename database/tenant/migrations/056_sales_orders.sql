create table if not exists sales_orders (
  id uuid primary key,
  tenant_id text not null,
  company_id text,
  branch_id text,
  order_number text not null,
  quotation_id uuid references sales_quotations(id),
  opportunity_id uuid references crm_opportunities(id),
  customer_id uuid not null references md_customers(id),
  party_id uuid references md_parties(id),
  order_date date not null,
  expected_delivery_date date,
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
  owner_user_id text,
  assigned_team_id text,
  confirmed_at timestamptz,
  cancelled_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint sales_orders_status_check check (status in ('DRAFT', 'CONFIRMED', 'CANCELLED', 'CLOSED'))
);

create table if not exists sales_order_lines (
  id uuid primary key,
  tenant_id text not null,
  order_id uuid not null references sales_orders(id) on delete cascade,
  quotation_line_id uuid references sales_quotation_lines(id),
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
  constraint sales_order_lines_quantity_check check (quantity > 0),
  constraint sales_order_lines_unit_price_check check (unit_price >= 0),
  constraint sales_order_lines_discount_percent_check check (discount_percent >= 0 and discount_percent <= 100),
  constraint sales_order_lines_tax_rate_check check (tax_rate >= 0)
);

create unique index if not exists sales_orders_tenant_company_number_uidx
  on sales_orders (tenant_id, coalesce(company_id, ''), order_number)
  where deleted_at is null;

create unique index if not exists sales_orders_quotation_uidx
  on sales_orders (quotation_id)
  where quotation_id is not null and deleted_at is null;

create unique index if not exists sales_order_lines_number_uidx on sales_order_lines (order_id, line_number);
create index if not exists sales_orders_number_idx on sales_orders (tenant_id, order_number);
create index if not exists sales_orders_quotation_idx on sales_orders (tenant_id, quotation_id);
create index if not exists sales_orders_opportunity_idx on sales_orders (tenant_id, opportunity_id);
create index if not exists sales_orders_customer_idx on sales_orders (tenant_id, customer_id);
create index if not exists sales_orders_party_idx on sales_orders (tenant_id, party_id);
create index if not exists sales_orders_status_idx on sales_orders (tenant_id, status);
create index if not exists sales_orders_order_date_idx on sales_orders (tenant_id, order_date);
create index if not exists sales_orders_expected_delivery_idx on sales_orders (tenant_id, expected_delivery_date);
create index if not exists sales_orders_owner_idx on sales_orders (tenant_id, owner_user_id);
create index if not exists sales_orders_deleted_at_idx on sales_orders (tenant_id, deleted_at);
create index if not exists sales_order_lines_order_idx on sales_order_lines (order_id);
