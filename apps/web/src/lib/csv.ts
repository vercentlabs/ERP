export function toCsv(rows: Record<string, unknown>[]) {
  if (rows.length === 0) return "";
  const columns = Object.keys(rows[0]);
  const body = rows.map((row) => columns.map((column) => JSON.stringify(row[column] ?? "")).join(","));
  return [columns.join(","), ...body].join("\n");
}
