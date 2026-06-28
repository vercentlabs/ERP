alter table crm_leads
  add column if not exists converted_party_id uuid,
  add column if not exists converted_at timestamptz,
  add column if not exists converted_by_user_id text,
  add column if not exists conversion_notes text;

create index if not exists crm_leads_converted_party_idx
  on crm_leads (tenant_id, converted_party_id)
  where converted_party_id is not null;

create index if not exists crm_leads_converted_customer_idx
  on crm_leads (tenant_id, converted_customer_id)
  where converted_customer_id is not null;

create index if not exists crm_leads_converted_opportunity_idx
  on crm_leads (tenant_id, converted_opportunity_id)
  where converted_opportunity_id is not null;

create index if not exists crm_leads_converted_at_idx
  on crm_leads (tenant_id, converted_at desc)
  where converted_at is not null;
