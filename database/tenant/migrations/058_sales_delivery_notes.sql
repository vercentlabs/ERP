create table if not exists sales_delivery_notes (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  delivery_note_number text not null,
  sales_order_id uuid not null references sales_orders(id),
  customer_id uuid not null references md_customers(id),
  party_id uuid references md_parties(id),
  delivery_date date not null default current_date,
  posting_date date,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'POSTED', 'CANCELLED')),
  shipping_address_id uuid references md_addresses(id),
  warehouse_id uuid references inventory_warehouses(id),
  carrier_name text,
  tracking_number text,
  vehicle_number text,
  eway_bill_number text,
  notes text,
  posted_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists sales_delivery_note_lines (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  delivery_note_id uuid not null references sales_delivery_notes(id) on delete cascade,
  sales_order_line_id uuid not null references sales_order_lines(id),
  line_number integer not null,
  item_id uuid not null references md_items(id),
  item_name text not null,
  description text,
  ordered_quantity numeric(18, 4) not null,
  previously_delivered_quantity numeric(18, 4) not null default 0,
  quantity numeric(18, 4) not null check (quantity > 0),
  remaining_quantity_after_delivery numeric(18, 4) not null default 0,
  uom_id uuid not null references md_uoms(id),
  warehouse_id uuid references inventory_warehouses(id),
  bin_id uuid references inventory_warehouse_bins(id),
  is_stock_item boolean not null default true,
  stock_ledger_entry_id uuid references inventory_stock_ledger_entries(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists sales_delivery_notes_tenant_company_number_uidx
  on sales_delivery_notes (tenant_id, coalesce(company_id, ''), delivery_note_number)
  where deleted_at is null;

create unique index if not exists sales_delivery_note_lines_number_uidx
  on sales_delivery_note_lines (delivery_note_id, line_number);

create index if not exists sales_delivery_notes_number_idx on sales_delivery_notes (tenant_id, delivery_note_number);
create index if not exists sales_delivery_notes_order_idx on sales_delivery_notes (tenant_id, sales_order_id);
create index if not exists sales_delivery_notes_customer_idx on sales_delivery_notes (tenant_id, customer_id);
create index if not exists sales_delivery_notes_status_idx on sales_delivery_notes (tenant_id, status);
create index if not exists sales_delivery_notes_delivery_date_idx on sales_delivery_notes (tenant_id, delivery_date);
create index if not exists sales_delivery_notes_posting_date_idx on sales_delivery_notes (tenant_id, posting_date);
create index if not exists sales_delivery_notes_warehouse_idx on sales_delivery_notes (tenant_id, warehouse_id);
create index if not exists sales_delivery_notes_deleted_at_idx on sales_delivery_notes (tenant_id, deleted_at);
create index if not exists sales_delivery_note_lines_note_idx on sales_delivery_note_lines (tenant_id, delivery_note_id);
create index if not exists sales_delivery_note_lines_order_line_idx on sales_delivery_note_lines (tenant_id, sales_order_line_id);
create index if not exists sales_delivery_note_lines_item_idx on sales_delivery_note_lines (tenant_id, item_id);
