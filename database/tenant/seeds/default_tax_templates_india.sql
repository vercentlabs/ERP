insert into seed_registry (seed_key, description)
values ('default_tax_templates_india', 'Default seed data for Default Tax Templates India')
on conflict (seed_key) do update set description = excluded.description;
