export const permissions = {
  read: "payroll/localizations/india/form-16:read",
  create: "payroll/localizations/india/form-16:create",
  update: "payroll/localizations/india/form-16:update",
  submit: "payroll/localizations/india/form-16:submit",
  approve: "payroll/localizations/india/form-16:approve",
  reject: "payroll/localizations/india/form-16:reject",
  cancel: "payroll/localizations/india/form-16:cancel",
  close: "payroll/localizations/india/form-16:close",
  report: "payroll/localizations/india/form-16:report",
} as const;

export type LocalizationsIndiaForm16Permission = (typeof permissions)[keyof typeof permissions];
