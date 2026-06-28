create or replace function calculate_payroll()
returns jsonb
language plpgsql
as $$
begin
  return jsonb_build_object('function', 'calculate_payroll', 'executed_at', now());
end;
$$;
