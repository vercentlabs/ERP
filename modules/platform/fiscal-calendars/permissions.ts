export const permissions = {
  read: "platform/fiscal-calendars:read",
  create: "platform/fiscal-calendars:create",
  update: "platform/fiscal-calendars:update",
  submit: "platform/fiscal-calendars:submit",
  approve: "platform/fiscal-calendars:approve",
  reject: "platform/fiscal-calendars:reject",
  cancel: "platform/fiscal-calendars:cancel",
  close: "platform/fiscal-calendars:close",
  report: "platform/fiscal-calendars:report",
} as const;

export type FiscalCalendarsPermission = (typeof permissions)[keyof typeof permissions];
