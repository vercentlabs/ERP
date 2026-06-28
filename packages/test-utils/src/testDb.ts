export function createTestDatabaseUrl(name = "vercent_test") {
  return `postgres://vercent:vercent@localhost:5432/${name}`;
}
