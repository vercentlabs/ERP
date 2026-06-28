export const permissions = {
  read: "payroll/salary-components:read",
  create: "payroll/salary-components:create",
  update: "payroll/salary-components:update",
  submit: "payroll/salary-components:submit",
  approve: "payroll/salary-components:approve",
  reject: "payroll/salary-components:reject",
  cancel: "payroll/salary-components:cancel",
  close: "payroll/salary-components:close",
  report: "payroll/salary-components:report",
} as const;

export type SalaryComponentsPermission = (typeof permissions)[keyof typeof permissions];
