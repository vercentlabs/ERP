export const permissions = {
  read: "payroll/tax-declarations:read",
  create: "payroll/tax-declarations:create",
  update: "payroll/tax-declarations:update",
  submit: "payroll/tax-declarations:submit",
  approve: "payroll/tax-declarations:approve",
  reject: "payroll/tax-declarations:reject",
  cancel: "payroll/tax-declarations:cancel",
  close: "payroll/tax-declarations:close",
  report: "payroll/tax-declarations:report",
} as const;

export type TaxDeclarationsPermission = (typeof permissions)[keyof typeof permissions];
