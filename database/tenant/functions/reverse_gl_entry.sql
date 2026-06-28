create or replace function reverse_gl_entry()
returns jsonb
language plpgsql
as $$
begin
  return jsonb_build_object('function', 'reverse_gl_entry', 'executed_at', now());
end;
$$;
