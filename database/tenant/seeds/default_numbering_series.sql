insert into seed_registry (seed_key, description)
values ('default_numbering_series', 'Default seed data for Default Numbering Series')
on conflict (seed_key) do update set description = excluded.description;
