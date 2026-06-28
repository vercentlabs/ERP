insert into seed_registry (seed_key, description)
values ('default_dashboards', 'Default seed data for Default Dashboards')
on conflict (seed_key) do update set description = excluded.description;
