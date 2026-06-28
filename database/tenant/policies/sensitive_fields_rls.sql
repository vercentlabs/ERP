alter table if exists tenant_documents enable row level security;

drop policy if exists sensitive_fields_rls on tenant_documents;
create policy sensitive_fields_rls on tenant_documents
  using (tenant_id = current_setting('app.tenant_id', true));
