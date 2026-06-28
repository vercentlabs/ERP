export const permissions = {
  read: "payroll/salary-structures:read",
  create: "payroll/salary-structures:create",
  update: "payroll/salary-structures:update",
  submit: "payroll/salary-structures:submit",
  approve: "payroll/salary-structures:approve",
  reject: "payroll/salary-structures:reject",
  cancel: "payroll/salary-structures:cancel",
  close: "payroll/salary-structures:close",
  report: "payroll/salary-structures:report",
} as const;

export type SalaryStructuresPermission = (typeof permissions)[keyof typeof permissions];
