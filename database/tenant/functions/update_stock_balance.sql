create or replace function update_stock_balance()
returns jsonb
language plpgsql
as $$
begin
  return jsonb_build_object('function', 'update_stock_balance', 'executed_at', now());
end;
$$;
