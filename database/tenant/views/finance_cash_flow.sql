create or replace view finance_cash_flow as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'finance_cash_flow'::text as report_name,
  now() as generated_at;
