create or replace function enforce_tenant_scope()
returns jsonb
language plpgsql
as $$
begin
  return jsonb_build_object('function', 'enforce_tenant_scope', 'executed_at', now());
end;
$$;
