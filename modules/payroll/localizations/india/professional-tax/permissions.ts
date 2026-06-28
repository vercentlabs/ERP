export const permissions = {
  read: "payroll/localizations/india/professional-tax:read",
  create: "payroll/localizations/india/professional-tax:create",
  update: "payroll/localizations/india/professional-tax:update",
  submit: "payroll/localizations/india/professional-tax:submit",
  approve: "payroll/localizations/india/professional-tax:approve",
  reject: "payroll/localizations/india/professional-tax:reject",
  cancel: "payroll/localizations/india/professional-tax:cancel",
  close: "payroll/localizations/india/professional-tax:close",
  report: "payroll/localizations/india/professional-tax:report",
} as const;

export type LocalizationsIndiaProfessionalTaxPermission = (typeof permissions)[keyof typeof permissions];
