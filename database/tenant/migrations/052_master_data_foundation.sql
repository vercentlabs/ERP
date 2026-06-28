create table if not exists md_parties (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  party_number text not null,
  party_type text not null check (party_type in ('INDIVIDUAL', 'COMPANY')),
  display_name text not null,
  legal_name text,
  tax_id text,
  gstin text,
  pan text,
  email text,
  phone text,
  website text,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'BLOCKED')),
  tags text[] not null default '{}',
  custom_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists md_addresses (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  party_id uuid not null references md_parties(id),
  address_type text not null check (address_type in ('BILLING', 'SHIPPING', 'REGISTERED', 'OFFICE', 'WAREHOUSE', 'OTHER')),
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'IN',
  gst_state_code text,
  is_default_billing boolean not null default false,
  is_default_shipping boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists md_customers (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  party_id uuid not null references md_parties(id),
  customer_number text not null,
  customer_group text,
  credit_limit numeric(18, 2) not null default 0,
  payment_terms text,
  currency char(3) not null default 'INR',
  gst_treatment text,
  receivable_account_id uuid,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'BLOCKED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists md_suppliers (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  party_id uuid not null references md_parties(id),
  supplier_number text not null,
  supplier_group text,
  payment_terms text,
  currency char(3) not null default 'INR',
  gst_treatment text,
  payable_account_id uuid,
  rating numeric(3, 2),
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'BLOCKED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists md_uoms (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  code text not null,
  name text not null,
  category text,
  precision integer not null default 0,
  is_base boolean not null default false,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'BLOCKED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists md_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  item_number text not null,
  sku text,
  name text not null,
  description text,
  item_type text not null check (item_type in ('PRODUCT', 'SERVICE', 'RAW_MATERIAL', 'FINISHED_GOOD', 'SEMI_FINISHED_GOOD', 'CONSUMABLE', 'ASSET')),
  item_group text,
  base_uom_id uuid not null references md_uoms(id),
  sales_uom_id uuid references md_uoms(id),
  purchase_uom_id uuid references md_uoms(id),
  is_stock_item boolean not null default true,
  is_sales_item boolean not null default true,
  is_purchase_item boolean not null default true,
  is_manufacturing_item boolean not null default false,
  standard_cost numeric(18, 2),
  selling_price numeric(18, 2),
  currency char(3) not null default 'INR',
  tax_category text,
  hsn_sac_code text,
  barcode text,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'BLOCKED')),
  tags text[] not null default '{}',
  custom_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create unique index if not exists md_parties_number_uidx on md_parties (tenant_id, coalesce(company_id, ''), party_number) where deleted_at is null;
create unique index if not exists md_customers_number_uidx on md_customers (tenant_id, coalesce(company_id, ''), customer_number) where deleted_at is null;
create unique index if not exists md_suppliers_number_uidx on md_suppliers (tenant_id, coalesce(company_id, ''), supplier_number) where deleted_at is null;
create unique index if not exists md_uoms_code_uidx on md_uoms (tenant_id, coalesce(company_id, ''), code) where deleted_at is null;
create unique index if not exists md_items_number_uidx on md_items (tenant_id, coalesce(company_id, ''), item_number) where deleted_at is null;
create unique index if not exists md_items_sku_uidx on md_items (tenant_id, coalesce(company_id, ''), sku) where sku is not null and deleted_at is null;

create index if not exists md_parties_display_name_idx on md_parties (tenant_id, display_name);
create index if not exists md_parties_email_idx on md_parties (tenant_id, lower(email));
create index if not exists md_parties_phone_idx on md_parties (tenant_id, phone);
create index if not exists md_parties_gstin_idx on md_parties (tenant_id, gstin);
create index if not exists md_parties_deleted_at_idx on md_parties (tenant_id, deleted_at);
create index if not exists md_addresses_party_idx on md_addresses (tenant_id, party_id);
create index if not exists md_addresses_deleted_at_idx on md_addresses (tenant_id, deleted_at);
create index if not exists md_customers_deleted_at_idx on md_customers (tenant_id, deleted_at);
create index if not exists md_suppliers_deleted_at_idx on md_suppliers (tenant_id, deleted_at);
create index if not exists md_items_name_idx on md_items (tenant_id, name);
create index if not exists md_items_status_idx on md_items (tenant_id, status);
create index if not exists md_items_deleted_at_idx on md_items (tenant_id, deleted_at);
