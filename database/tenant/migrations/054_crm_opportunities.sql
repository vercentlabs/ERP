create table if not exists crm_opportunities (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  opportunity_number text not null,
  name text not null,
  customer_id uuid not null references md_customers(id),
  party_id uuid references md_parties(id),
  lead_id uuid references crm_leads(id),
  owner_user_id text,
  assigned_team_id text,
  stage text not null default 'PROSPECTING',
  probability integer not null default 10 check (probability >= 0 and probability <= 100),
  expected_value numeric(18, 2) not null default 0,
  currency char(3) not null default 'INR',
  expected_close_date date,
  source text,
  loss_reason text,
  notes text,
  tags text[] not null default '{}',
  custom_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  closed_at timestamptz,
  constraint crm_opportunities_stage_check check (
    stage in ('PROSPECTING', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST')
  ),
  constraint crm_opportunities_lost_reason_check check (
    stage <> 'LOST' or nullif(trim(loss_reason), '') is not null
  )
);

create unique index if not exists crm_opportunities_tenant_company_number_uidx
  on crm_opportunities (tenant_id, coalesce(company_id, ''), opportunity_number)
  where deleted_at is null;

create index if not exists crm_opportunities_number_idx on crm_opportunities (tenant_id, opportunity_number);
create index if not exists crm_opportunities_customer_idx on crm_opportunities (tenant_id, customer_id);
create index if not exists crm_opportunities_party_idx on crm_opportunities (tenant_id, party_id);
create index if not exists crm_opportunities_lead_idx on crm_opportunities (tenant_id, lead_id);
create index if not exists crm_opportunities_owner_idx on crm_opportunities (tenant_id, owner_user_id);
create index if not exists crm_opportunities_team_idx on crm_opportunities (tenant_id, assigned_team_id);
create index if not exists crm_opportunities_stage_idx on crm_opportunities (tenant_id, stage);
create index if not exists crm_opportunities_expected_close_idx on crm_opportunities (tenant_id, expected_close_date);
create index if not exists crm_opportunities_created_at_idx on crm_opportunities (tenant_id, created_at desc);
create index if not exists crm_opportunities_deleted_at_idx on crm_opportunities (tenant_id, deleted_at);
