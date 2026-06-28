export const permissions = {
  read: "payroll/localizations/india/esi:read",
  create: "payroll/localizations/india/esi:create",
  update: "payroll/localizations/india/esi:update",
  submit: "payroll/localizations/india/esi:submit",
  approve: "payroll/localizations/india/esi:approve",
  reject: "payroll/localizations/india/esi:reject",
  cancel: "payroll/localizations/india/esi:cancel",
  close: "payroll/localizations/india/esi:close",
  report: "payroll/localizations/india/esi:report",
} as const;

export type LocalizationsIndiaEsiPermission = (typeof permissions)[keyof typeof permissions];
