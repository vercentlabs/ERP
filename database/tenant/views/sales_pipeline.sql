create or replace view sales_pipeline as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'sales_pipeline'::text as report_name,
  now() as generated_at;
