create or replace view inventory_stock_valuation as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'inventory_stock_valuation'::text as report_name,
  now() as generated_at;
