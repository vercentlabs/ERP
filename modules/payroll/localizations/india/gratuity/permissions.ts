export const permissions = {
  read: "payroll/localizations/india/gratuity:read",
  create: "payroll/localizations/india/gratuity:create",
  update: "payroll/localizations/india/gratuity:update",
  submit: "payroll/localizations/india/gratuity:submit",
  approve: "payroll/localizations/india/gratuity:approve",
  reject: "payroll/localizations/india/gratuity:reject",
  cancel: "payroll/localizations/india/gratuity:cancel",
  close: "payroll/localizations/india/gratuity:close",
  report: "payroll/localizations/india/gratuity:report",
} as const;

export type LocalizationsIndiaGratuityPermission = (typeof permissions)[keyof typeof permissions];
