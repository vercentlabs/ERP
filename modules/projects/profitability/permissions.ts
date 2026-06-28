export const permissions = {
  read: "projects/profitability:read",
  create: "projects/profitability:create",
  update: "projects/profitability:update",
  submit: "projects/profitability:submit",
  approve: "projects/profitability:approve",
  reject: "projects/profitability:reject",
  cancel: "projects/profitability:cancel",
  close: "projects/profitability:close",
  report: "projects/profitability:report",
} as const;

export type ProfitabilityPermission = (typeof permissions)[keyof typeof permissions];
