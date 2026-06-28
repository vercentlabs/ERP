create or replace view payroll_register as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'payroll_register'::text as report_name,
  now() as generated_at;
