export const permissions = {
  read: "payroll/localizations/india/tds:read",
  create: "payroll/localizations/india/tds:create",
  update: "payroll/localizations/india/tds:update",
  submit: "payroll/localizations/india/tds:submit",
  approve: "payroll/localizations/india/tds:approve",
  reject: "payroll/localizations/india/tds:reject",
  cancel: "payroll/localizations/india/tds:cancel",
  close: "payroll/localizations/india/tds:close",
  report: "payroll/localizations/india/tds:report",
} as const;

export type LocalizationsIndiaTdsPermission = (typeof permissions)[keyof typeof permissions];
