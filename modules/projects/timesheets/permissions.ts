export const permissions = {
  read: "projects/timesheets:read",
  create: "projects/timesheets:create",
  update: "projects/timesheets:update",
  submit: "projects/timesheets:submit",
  approve: "projects/timesheets:approve",
  reject: "projects/timesheets:reject",
  cancel: "projects/timesheets:cancel",
  close: "projects/timesheets:close",
  report: "projects/timesheets:report",
} as const;

export type TimesheetsPermission = (typeof permissions)[keyof typeof permissions];
