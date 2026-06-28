create table if not exists inventory_warehouses (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  warehouse_number text not null,
  name text not null,
  code text not null,
  type text not null default 'MAIN' check (type in ('MAIN', 'BRANCH', 'TRANSIT', 'VIRTUAL', 'PRODUCTION', 'THIRD_PARTY')),
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'BLOCKED')),
  address_id uuid references md_addresses(id),
  manager_user_id text,
  is_default boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists inventory_warehouse_bins (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  warehouse_id uuid not null references inventory_warehouses(id),
  bin_number text not null,
  code text not null,
  name text not null,
  zone text,
  aisle text,
  rack text,
  shelf text,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'BLOCKED')),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists inventory_stock_ledger_entries (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  entry_number text not null,
  item_id uuid not null references md_items(id),
  warehouse_id uuid not null references inventory_warehouses(id),
  bin_id uuid references inventory_warehouse_bins(id),
  posting_date date not null default current_date,
  posting_time time not null default current_time,
  movement_type text not null check (movement_type in ('OPENING', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT', 'TRANSFER_IN', 'TRANSFER_OUT', 'SALES_HOLD', 'SALES_RELEASE', 'SALES_ISSUE', 'PURCHASE_RECEIPT', 'MANUFACTURING_RECEIPT', 'MANUFACTURING_ISSUE')),
  quantity numeric(18, 6) not null check (quantity > 0),
  uom_id uuid not null references md_uoms(id),
  stock_value numeric(18, 2),
  unit_cost numeric(18, 6),
  reference_type text,
  reference_id text,
  remarks text,
  created_by_user_id text,
  created_at timestamptz not null default now(),
  constraint inventory_stock_ledger_bin_wh_fk check (bin_id is null or warehouse_id is not null)
);

create table if not exists inventory_stock_balances (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  item_id uuid not null references md_items(id),
  warehouse_id uuid not null references inventory_warehouses(id),
  bin_id uuid references inventory_warehouse_bins(id),
  quantity_on_hand numeric(18, 6) not null default 0,
  quantity_reserved numeric(18, 6) not null default 0,
  quantity_available numeric(18, 6) generated always as (quantity_on_hand - quantity_reserved) stored,
  stock_value numeric(18, 2),
  average_cost numeric(18, 6),
  updated_at timestamptz not null default now()
);

create unique index if not exists inventory_warehouses_number_uidx on inventory_warehouses (tenant_id, coalesce(company_id, ''), warehouse_number) where deleted_at is null;
create unique index if not exists inventory_warehouses_code_uidx on inventory_warehouses (tenant_id, coalesce(company_id, ''), code) where deleted_at is null;
create unique index if not exists inventory_warehouse_bins_code_uidx on inventory_warehouse_bins (tenant_id, warehouse_id, code) where deleted_at is null;
create unique index if not exists inventory_stock_balances_scope_uidx on inventory_stock_balances (tenant_id, item_id, warehouse_id, coalesce(bin_id, '00000000-0000-0000-0000-000000000000'::uuid));

create index if not exists inventory_warehouses_number_idx on inventory_warehouses (tenant_id, warehouse_number);
create index if not exists inventory_warehouses_code_idx on inventory_warehouses (tenant_id, code);
create index if not exists inventory_warehouses_status_idx on inventory_warehouses (tenant_id, status);
create index if not exists inventory_warehouses_deleted_idx on inventory_warehouses (tenant_id, deleted_at);
create index if not exists inventory_warehouse_bins_warehouse_idx on inventory_warehouse_bins (tenant_id, warehouse_id);
create index if not exists inventory_warehouse_bins_code_idx on inventory_warehouse_bins (tenant_id, code);
create index if not exists inventory_warehouse_bins_deleted_idx on inventory_warehouse_bins (tenant_id, deleted_at);
create index if not exists inventory_stock_ledger_item_idx on inventory_stock_ledger_entries (tenant_id, item_id);
create index if not exists inventory_stock_ledger_warehouse_idx on inventory_stock_ledger_entries (tenant_id, warehouse_id);
create index if not exists inventory_stock_ledger_bin_idx on inventory_stock_ledger_entries (tenant_id, bin_id);
create index if not exists inventory_stock_ledger_movement_idx on inventory_stock_ledger_entries (tenant_id, movement_type);
create index if not exists inventory_stock_ledger_posting_date_idx on inventory_stock_ledger_entries (tenant_id, posting_date);
create index if not exists inventory_stock_ledger_reference_idx on inventory_stock_ledger_entries (tenant_id, reference_type, reference_id);
create index if not exists inventory_stock_balances_item_idx on inventory_stock_balances (tenant_id, item_id);
create index if not exists inventory_stock_balances_warehouse_idx on inventory_stock_balances (tenant_id, warehouse_id);
create index if not exists inventory_stock_balances_bin_idx on inventory_stock_balances (tenant_id, bin_id);
