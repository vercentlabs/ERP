create or replace view finance_trial_balance as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'finance_trial_balance'::text as report_name,
  now() as generated_at;
