export const permissions = {
  read: "payroll/payroll-runs:read",
  create: "payroll/payroll-runs:create",
  update: "payroll/payroll-runs:update",
  submit: "payroll/payroll-runs:submit",
  approve: "payroll/payroll-runs:approve",
  reject: "payroll/payroll-runs:reject",
  cancel: "payroll/payroll-runs:cancel",
  close: "payroll/payroll-runs:close",
  report: "payroll/payroll-runs:report",
} as const;

export type PayrollRunsPermission = (typeof permissions)[keyof typeof permissions];
