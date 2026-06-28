export const permissions = {
  read: "payroll/payslips:read",
  create: "payroll/payslips:create",
  update: "payroll/payslips:update",
  submit: "payroll/payslips:submit",
  approve: "payroll/payslips:approve",
  reject: "payroll/payslips:reject",
  cancel: "payroll/payslips:cancel",
  close: "payroll/payslips:close",
  report: "payroll/payslips:report",
} as const;

export type PayslipsPermission = (typeof permissions)[keyof typeof permissions];
