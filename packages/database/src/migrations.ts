export type Migration = {
  id: string;
  name: string;
  database: "control-plane" | "tenant";
  checksum?: string;
};

export function sortMigrations(migrations: Migration[]) {
  return [...migrations].sort((left, right) => left.id.localeCompare(right.id));
}
