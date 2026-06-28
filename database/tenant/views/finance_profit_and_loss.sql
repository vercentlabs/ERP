create or replace view finance_profit_and_loss as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'finance_profit_and_loss'::text as report_name,
  now() as generated_at;
