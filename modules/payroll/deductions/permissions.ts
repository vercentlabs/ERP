export const permissions = {
  read: "payroll/deductions:read",
  create: "payroll/deductions:create",
  update: "payroll/deductions:update",
  submit: "payroll/deductions:submit",
  approve: "payroll/deductions:approve",
  reject: "payroll/deductions:reject",
  cancel: "payroll/deductions:cancel",
  close: "payroll/deductions:close",
  report: "payroll/deductions:report",
} as const;

export type DeductionsPermission = (typeof permissions)[keyof typeof permissions];
