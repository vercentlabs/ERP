#!/usr/bin/env sh
set -eu
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<SQL
select 'create database vercent_control_plane'
where not exists (select from pg_database where datname = 'vercent_control_plane')\gexec
select 'create database vercent_tenant_dev'
where not exists (select from pg_database where datname = 'vercent_tenant_dev')\gexec
select 'create database vercent_tenant_template'
where not exists (select from pg_database where datname = 'vercent_tenant_template')\gexec
SQL
