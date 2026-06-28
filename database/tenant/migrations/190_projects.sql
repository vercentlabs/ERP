create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  tenant_id text,
  code text not null,
  name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_tenant_idx on projects (tenant_id);
