create table if not exists payroll (
  id uuid primary key default gen_random_uuid(),
  tenant_id text,
  code text not null,
  name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payroll_tenant_idx on payroll (tenant_id);
