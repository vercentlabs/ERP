create or replace function post_gl_entry()
returns jsonb
language plpgsql
as $$
begin
  return jsonb_build_object('function', 'post_gl_entry', 'executed_at', now());
end;
$$;
