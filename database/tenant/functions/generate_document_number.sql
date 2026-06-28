create or replace function generate_document_number()
returns jsonb
language plpgsql
as $$
begin
  return jsonb_build_object('function', 'generate_document_number', 'executed_at', now());
end;
$$;
