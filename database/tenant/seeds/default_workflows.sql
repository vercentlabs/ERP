insert into seed_registry (seed_key, description)
values ('default_workflows', 'Default seed data for Default Workflows')
on conflict (seed_key) do update set description = excluded.description;
