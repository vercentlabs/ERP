insert into seed_registry (seed_key, description)
values ('default_platform_admin', 'Default seed data for Default Platform Admin')
on conflict (seed_key) do update set description = excluded.description;
