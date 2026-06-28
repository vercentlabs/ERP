create or replace view manufacturing_wip as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'manufacturing_wip'::text as report_name,
  now() as generated_at;
