insert into seed_registry (seed_key, description)
values ('default_permissions', 'Default seed data for Default Permissions')
on conflict (seed_key) do update set description = excluded.description;
