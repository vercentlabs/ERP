export const permissions = {
  read: "payroll/payroll-periods:read",
  create: "payroll/payroll-periods:create",
  update: "payroll/payroll-periods:update",
  submit: "payroll/payroll-periods:submit",
  approve: "payroll/payroll-periods:approve",
  reject: "payroll/payroll-periods:reject",
  cancel: "payroll/payroll-periods:cancel",
  close: "payroll/payroll-periods:close",
  report: "payroll/payroll-periods:report",
} as const;

export type PayrollPeriodsPermission = (typeof permissions)[keyof typeof permissions];
