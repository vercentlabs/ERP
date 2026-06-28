export const erpModules = [
  "crm",
  "sales",
  "procurement",
  "inventory",
  "finance",
  "manufacturing",
  "hr",
  "payroll",
  "projects",
  "helpdesk",
  "analytics",
  "ai",
] as const;

export type ErpModule = (typeof erpModules)[number];
