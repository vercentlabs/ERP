export type QueryFilter = {
  field: string;
  operator: "=" | "!=" | "in" | "contains";
  value: unknown;
};

export function buildWhereClause(filters: QueryFilter[]) {
  return filters.map((filter, index) => ({
    parameter: `$${index + 1}`,
    sql: `${filter.field} ${filter.operator === "contains" ? "ilike" : filter.operator} $${index + 1}`,
    value: filter.operator === "contains" ? `%${filter.value}%` : filter.value,
  }));
}
