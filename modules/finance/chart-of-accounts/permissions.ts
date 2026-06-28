export const permissions = {
  read: "finance/chart-of-accounts:read",
  create: "finance/chart-of-accounts:create",
  update: "finance/chart-of-accounts:update",
  submit: "finance/chart-of-accounts:submit",
  approve: "finance/chart-of-accounts:approve",
  reject: "finance/chart-of-accounts:reject",
  cancel: "finance/chart-of-accounts:cancel",
  close: "finance/chart-of-accounts:close",
  report: "finance/chart-of-accounts:report",
} as const;

export type ChartOfAccountsPermission = (typeof permissions)[keyof typeof permissions];
