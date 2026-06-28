create or replace view finance_balance_sheet as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'finance_balance_sheet'::text as report_name,
  now() as generated_at;
