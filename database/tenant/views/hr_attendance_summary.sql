create or replace view hr_attendance_summary as
select
  current_setting('app.tenant_id', true) as tenant_id,
  'hr_attendance_summary'::text as report_name,
  now() as generated_at;
