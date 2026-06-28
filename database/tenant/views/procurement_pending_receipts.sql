create or replace view procurement_pending_receipts as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'procurement_pending_receipts'::text as report_name,
  now() as generated_at;
