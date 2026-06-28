create or replace view project_profitability as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'project_profitability'::text as report_name,
  now() as generated_at;
