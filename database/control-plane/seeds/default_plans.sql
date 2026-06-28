insert into seed_registry (seed_key, description)
values ('default_plans', 'Default seed data for Default Plans')
on conflict (seed_key) do update set description = excluded.description;
