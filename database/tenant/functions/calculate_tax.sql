create or replace function calculate_tax()
returns jsonb
language plpgsql
as $$
begin
  return jsonb_build_object('function', 'calculate_tax', 'executed_at', now());
end;
$$;
