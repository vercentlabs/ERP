export const permissions = {
  read: "finance/financial-reports:read",
  create: "finance/financial-reports:create",
  update: "finance/financial-reports:update",
  submit: "finance/financial-reports:submit",
  approve: "finance/financial-reports:approve",
  reject: "finance/financial-reports:reject",
  cancel: "finance/financial-reports:cancel",
  close: "finance/financial-reports:close",
  report: "finance/financial-reports:report",
} as const;

export type FinancialReportsPermission = (typeof permissions)[keyof typeof permissions];
