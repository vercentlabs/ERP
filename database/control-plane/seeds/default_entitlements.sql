insert into seed_registry (seed_key, description)
values ('default_entitlements', 'Default seed data for Default Entitlements')
on conflict (seed_key) do update set description = excluded.description;
