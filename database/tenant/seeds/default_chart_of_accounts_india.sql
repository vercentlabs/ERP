insert into seed_registry (seed_key, description)
values ('default_chart_of_accounts_india', 'Default seed data for Default Chart Of Accounts India')
on conflict (seed_key) do update set description = excluded.description;
