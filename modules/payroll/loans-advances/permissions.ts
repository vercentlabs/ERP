export const permissions = {
  read: "payroll/loans-advances:read",
  create: "payroll/loans-advances:create",
  update: "payroll/loans-advances:update",
  submit: "payroll/loans-advances:submit",
  approve: "payroll/loans-advances:approve",
  reject: "payroll/loans-advances:reject",
  cancel: "payroll/loans-advances:cancel",
  close: "payroll/loans-advances:close",
  report: "payroll/loans-advances:report",
} as const;

export type LoansAdvancesPermission = (typeof permissions)[keyof typeof permissions];
