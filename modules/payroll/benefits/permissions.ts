export const permissions = {
  read: "payroll/benefits:read",
  create: "payroll/benefits:create",
  update: "payroll/benefits:update",
  submit: "payroll/benefits:submit",
  approve: "payroll/benefits:approve",
  reject: "payroll/benefits:reject",
  cancel: "payroll/benefits:cancel",
  close: "payroll/benefits:close",
  report: "payroll/benefits:report",
} as const;

export type BenefitsPermission = (typeof permissions)[keyof typeof permissions];
