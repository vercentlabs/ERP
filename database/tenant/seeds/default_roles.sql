insert into seed_registry (seed_key, description)
values ('default_roles', 'Default seed data for Default Roles')
on conflict (seed_key) do update set description = excluded.description;
