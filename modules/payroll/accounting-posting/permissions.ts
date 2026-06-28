export const permissions = {
  read: "payroll/accounting-posting:read",
  create: "payroll/accounting-posting:create",
  update: "payroll/accounting-posting:update",
  submit: "payroll/accounting-posting:submit",
  approve: "payroll/accounting-posting:approve",
  reject: "payroll/accounting-posting:reject",
  cancel: "payroll/accounting-posting:cancel",
  close: "payroll/accounting-posting:close",
  report: "payroll/accounting-posting:report",
} as const;

export type AccountingPostingPermission = (typeof permissions)[keyof typeof permissions];
