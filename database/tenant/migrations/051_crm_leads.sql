create table if not exists crm_leads (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  company_id text,
  branch_id text,
  lead_number text not null,
  first_name text not null,
  last_name text not null,
  company_name text,
  email text,
  phone text,
  source text,
  status text not null default 'NEW',
  score integer not null default 0 check (score >= 0 and score <= 100),
  owner_user_id text,
  assigned_team_id text,
  expected_value numeric(18, 2),
  currency char(3) not null default 'INR',
  notes text,
  tags text[] not null default '{}',
  custom_fields jsonb not null default '{}'::jsonb,
  converted_customer_id uuid,
  converted_opportunity_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint crm_leads_status_check check (
    status in ('NEW', 'CONTACTED', 'QUALIFIED', 'DISQUALIFIED', 'CONVERTED')
  )
);

create unique index if not exists crm_leads_tenant_company_number_uidx
  on crm_leads (tenant_id, coalesce(company_id, ''), lead_number)
  where deleted_at is null;

create index if not exists crm_leads_status_idx on crm_leads (tenant_id, status);
create index if not exists crm_leads_email_idx on crm_leads (tenant_id, lower(email));
create index if not exists crm_leads_phone_idx on crm_leads (tenant_id, phone);
create index if not exists crm_leads_owner_user_idx on crm_leads (tenant_id, owner_user_id);
create index if not exists crm_leads_created_at_idx on crm_leads (tenant_id, created_at desc);
create index if not exists crm_leads_deleted_at_idx on crm_leads (tenant_id, deleted_at);
create index if not exists crm_leads_lead_number_idx on crm_leads (tenant_id, lead_number);
