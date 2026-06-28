export const permissions = {
  read: "finance/accounting-periods:read",
  create: "finance/accounting-periods:create",
  update: "finance/accounting-periods:update",
  submit: "finance/accounting-periods:submit",
  approve: "finance/accounting-periods:approve",
  reject: "finance/accounting-periods:reject",
  cancel: "finance/accounting-periods:cancel",
  close: "finance/accounting-periods:close",
  report: "finance/accounting-periods:report",
} as const;

export type AccountingPeriodsPermission = (typeof permissions)[keyof typeof permissions];
