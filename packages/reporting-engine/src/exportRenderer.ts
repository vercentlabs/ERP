import type { ReportDefinition } from "./reportDefinition";

export function renderCsv(definition: ReportDefinition, rows: Record<string, unknown>[]) {
  const header = definition.columns.map((column) => column.label).join(",");
  const body = rows.map((row) => definition.columns.map((column) => JSON.stringify(row[column.key] ?? "")).join(","));
  return [header, ...body].join("\n");
}
