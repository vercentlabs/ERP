create or replace view helpdesk_sla_performance as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'helpdesk_sla_performance'::text as report_name,
  now() as generated_at;
