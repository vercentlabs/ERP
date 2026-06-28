export const permissions = {
  read: "payroll/localizations/india/pf:read",
  create: "payroll/localizations/india/pf:create",
  update: "payroll/localizations/india/pf:update",
  submit: "payroll/localizations/india/pf:submit",
  approve: "payroll/localizations/india/pf:approve",
  reject: "payroll/localizations/india/pf:reject",
  cancel: "payroll/localizations/india/pf:cancel",
  close: "payroll/localizations/india/pf:close",
  report: "payroll/localizations/india/pf:report",
} as const;

export type LocalizationsIndiaPfPermission = (typeof permissions)[keyof typeof permissions];
